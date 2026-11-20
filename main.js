const { app, BrowserWindow, ipcMain, safeStorage, shell, dialog } = require("electron");
const path = require("node:path");
const fs = require("node:fs/promises");

const DEVICE_URL = "https://id.twitch.tv/oauth2/device";
const TOKEN_URL = "https://id.twitch.tv/oauth2/token";
const VALIDATE_URL = "https://id.twitch.tv/oauth2/validate";
const HELIX_URL = "https://api.twitch.tv/helix";
const SESSION_FILE = "twitch-session.bin";
const CLIENT_ID_FILE = "twitch-client-id.bin";
const UPDATE_FEED_FILE = "update-feed.json";
const UPDATE_INTERVAL = 24 * 60 * 60 * 1000;
const SCOPES = "moderator:read:followers";
const LIBRARY_ASSETS = {
  overlay: { source: "overlay.svg", filename: "streammate-overlay.svg" },
  starting: { source: "starting-countdown.svg", filename: "starting-countdown.svg" },
  sound: { source: "notification-chime.wav", filename: "notification-chime.wav" },
  thumbnail: { source: "thumbnail-guide.html", filename: "thumbnail-guide.html" },
  chat: { source: "chat-stamps.svg", filename: "chat-stamps.svg" },
  planner: { source: "planner.csv", filename: "stream-planner.csv" },
  endcard: { source: "endcard.svg", filename: "stream-endcard.svg" },
  audio: { source: "audio-guide.html", filename: "audio-setup-guide.html" },
  schedule: { source: "schedule.csv", filename: "weekly-schedule.csv" },
  alert: { source: "alert.svg", filename: "thank-you-alert.svg" },
  title: { source: "title-guide.html", filename: "title-ideas.html" },
  scene: { source: "scene.svg", filename: "cozy-workspace.svg" }
};
const BOOTH_ITEM_IDS = new Set(["3471857", "2960573", "3277257", "7671590", "5871788", "6140047"]);

let mainWindow;
let twitchSession = null;
let latestUpdate = null;
let pendingDeviceFlow = null;
let loginStartInProgress = false;
let loginStartCancelled = false;
let sessionValidationTimer;
let updateCheckTimer;
let sessionValidationRunning = false;

class TwitchRequestError extends Error {
  constructor(message, status, code) {
    super(message);
    this.name = "TwitchRequestError";
    this.status = status;
    this.code = code;
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 1050,
    minHeight: 700,
    backgroundColor: "#0d0f12",
    icon: path.join(__dirname, "assets", "streammate-icon.ico"),
    title: "Streammate Studio",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  mainWindow.loadFile(path.join(__dirname, "index.html"));
  mainWindow.on("closed", () => { mainWindow = null; });
}

function getUserDataPath(filename) {
  return path.join(app.getPath("userData"), filename);
}

function sendTwitchStatus(status) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send("twitch:status", status);
  }
}

function getPublicUser(session) {
  if (!session) return null;
  return { login: session.login, userId: session.userId };
}

async function twitchRequest(url, options = {}) {
  let response;
  try {
    response = await fetch(url, {
      ...options,
      signal: AbortSignal.timeout(10000)
    });
  } catch (error) {
    throw new Error(`ネットワーク接続に失敗しました: ${error.message}`);
  }

  let result;
  try {
    result = await response.json();
  } catch {
    throw new Error("サーバーから有効な応答を受け取れませんでした。");
  }

  if (!response.ok) {
    const code = result.error || result.message || "request_failed";
    throw new TwitchRequestError(
      result.message || result.error_description || `HTTP error (${response.status})`,
      response.status,
      code
    );
  }

  return result;
}

function postForm(url, fields) {
  return twitchRequest(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(fields)
  });
}

async function validateToken(accessToken, clientId) {
  const result = await twitchRequest(VALIDATE_URL, {
    headers: { Authorization: `OAuth ${accessToken}` }
  });
  if (result.client_id !== clientId || !result.user_id || !result.login) {
    throw new Error("Twitchの認証情報がこのアプリのものと一致しません。");
  }
  return result;
}

function getSessionPath() {
  return getUserDataPath(SESSION_FILE);
}

async function readClientId() {
  if (!safeStorage.isEncryptionAvailable()) {
    throw new Error("この端末では安全な認証情報の保存を利用できません。");
  }
  try {
    const encrypted = await fs.readFile(getUserDataPath(CLIENT_ID_FILE));
    return safeStorage.decryptString(encrypted);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw new Error(`Twitch設定を読み込めませんでした: ${error.message}`);
  }
}

async function persistClientId(clientId) {
  if (!safeStorage.isEncryptionAvailable()) {
    throw new Error("この端末では安全な認証情報の保存を利用できません。");
  }
  const encrypted = safeStorage.encryptString(clientId);
  await fs.writeFile(getUserDataPath(CLIENT_ID_FILE), encrypted);
}

async function persistSession(session) {
  if (!safeStorage.isEncryptionAvailable()) {
    throw new Error("この端末では安全なトークン保存を利用できません。");
  }
  const encrypted = safeStorage.encryptString(JSON.stringify(session));
  await fs.writeFile(getSessionPath(), encrypted);
}

async function removePersistedSession() {
  try {
    await fs.unlink(getSessionPath());
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

async function refreshSession(session) {
  const result = await postForm(TOKEN_URL, {
    client_id: session.clientId,
    grant_type: "refresh_token",
    refresh_token: session.refreshToken
  });
  if (!result.access_token || !result.refresh_token || !result.expires_in) {
    throw new Error("Twitchから更新済みの認証情報を受け取れませんでした。");
  }

  const validated = await validateToken(result.access_token, session.clientId);
  const updated = {
    clientId: session.clientId,
    accessToken: result.access_token,
    refreshToken: result.refresh_token,
    login: validated.login,
    userId: validated.user_id,
    scopes: validated.scopes || [],
    expiresAt: Date.now() + result.expires_in * 1000
  };
  await persistSession(updated);
  twitchSession = updated;
  return updated;
}

async function clearSession() {
  twitchSession = null;
  await removePersistedSession();
  sendTwitchStatus({ state: "signed-out" });
}

async function restoreSession() {
  if (!safeStorage.isEncryptionAvailable()) return;

  let stored;
  try {
    const encrypted = await fs.readFile(getSessionPath());
    stored = JSON.parse(safeStorage.decryptString(encrypted));
  } catch (error) {
    if (error.code === "ENOENT") return;
    console.error("Twitchセッションを読み込めませんでした:", error);
    await removePersistedSession();
    return;
  }

  try {
    if (stored.expiresAt <= Date.now()) {
      await refreshSession(stored);
      return;
    }
    const validated = await validateToken(stored.accessToken, stored.clientId);
    twitchSession = {
      ...stored,
      login: validated.login,
      userId: validated.user_id,
      scopes: validated.scopes || [],
      expiresAt: Date.now() + validated.expires_in * 1000
    };
    await persistSession(twitchSession);
  } catch (error) {
    if (error.status === 401 || error.status === 400) {
      await clearSession();
      return;
    }
    console.error("Twitchセッションを検証できませんでした:", error);
    twitchSession = stored;
    sendTwitchStatus({
      state: "unverified",
      user: getPublicUser(stored),
      message: "Twitchに接続できません。ネットワークを確認してください。"
    });
  }
}

async function validateActiveSession() {
  if (!twitchSession || sessionValidationRunning) return;
  sessionValidationRunning = true;
  try {
    if (twitchSession.expiresAt <= Date.now() + 60 * 1000) {
      await refreshSession(twitchSession);
    } else {
      const validated = await validateToken(twitchSession.accessToken, twitchSession.clientId);
      twitchSession = {
        ...twitchSession,
        login: validated.login,
        userId: validated.user_id,
        scopes: validated.scopes || [],
        expiresAt: Date.now() + validated.expires_in * 1000
      };
      await persistSession(twitchSession);
    }
    sendTwitchStatus({ state: "connected", user: getPublicUser(twitchSession) });
  } catch (error) {
    if (error.status === 401 || error.status === 400) {
      try {
        await clearSession();
      } catch (clearError) {
        console.error("Twitchセッションを削除できませんでした:", clearError);
        sendTwitchStatus({ state: "error", message: clearError.message });
      }
    } else {
      console.error("Twitchセッションを検証できませんでした:", error);
      sendTwitchStatus({
        state: "unverified",
        user: getPublicUser(twitchSession),
        message: "Twitchに接続できません。ネットワークを確認してください。"
      });
    }
  } finally {
    sessionValidationRunning = false;
  }
}

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function pollDeviceFlow(flow) {
  while (pendingDeviceFlow === flow && Date.now() < flow.expiresAt) {
    await wait(flow.interval * 1000);
    if (pendingDeviceFlow !== flow) return;

    try {
      const result = await postForm(TOKEN_URL, {
        client_id: flow.clientId,
        device_code: flow.deviceCode,
        grant_type: "urn:ietf:params:oauth:grant-type:device_code",
        scopes: SCOPES
      });
      if (!result.access_token || !result.refresh_token || !result.expires_in) {
        throw new Error("Twitchから認証トークンを受け取れませんでした。");
      }

      const validated = await validateToken(result.access_token, flow.clientId);
      const session = {
        clientId: flow.clientId,
        accessToken: result.access_token,
        refreshToken: result.refresh_token,
        login: validated.login,
        userId: validated.user_id,
        scopes: validated.scopes || [],
        expiresAt: Date.now() + result.expires_in * 1000
      };
      await persistSession(session);
      twitchSession = session;
      pendingDeviceFlow = null;
      sendTwitchStatus({ state: "connected", user: getPublicUser(session) });
      return;
    } catch (error) {
      if (pendingDeviceFlow !== flow) return;
      if (error.code === "authorization_pending") continue;
      if (error.code === "slow_down") {
        flow.interval += 5;
        continue;
      }
      if (error.code === "access_denied") {
        throw new Error("Twitchでの認証がキャンセルされました。");
      }
      throw error;
    }
  }

  if (pendingDeviceFlow === flow) {
    throw new Error("認証コードの有効期限が切れました。もう一度お試しください。");
  }
}

function isNewerVersion(candidate, current) {
  const parse = (version) => {
    if (typeof version !== "string" || !/^\d+\.\d+\.\d+$/.test(version)) return null;
    return version.split(".").map(Number);
  };
  const next = parse(candidate);
  const installed = parse(current);
  if (!next || !installed) throw new Error("更新フィードのバージョン形式が不正です。");
  for (let index = 0; index < 3; index++) {
    if (next[index] !== installed[index]) return next[index] > installed[index];
  }
  return false;
}

async function readUpdateFeedUrl() {
  try {
    const value = JSON.parse(await fs.readFile(getUserDataPath(UPDATE_FEED_FILE), "utf8"));
    return value.url;
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw new Error(`更新フィード設定を読み込めませんでした: ${error.message}`);
  }
}

async function checkForUpdates() {
  const feedUrl = await readUpdateFeedUrl();
  if (!feedUrl) return { state: "not-configured", currentVersion: app.getVersion() };
  const url = new URL(feedUrl);
  if (url.protocol !== "https:" || url.username || url.password) {
    throw new Error("更新フィードには認証情報を含まないHTTPS URLを設定してください。");
  }

  const manifest = await twitchRequest(url.toString(), {
    headers: { Accept: "application/json" }
  });
  if (typeof manifest.downloadUrl !== "string" || !manifest.downloadUrl
    || typeof manifest.title !== "string" || typeof manifest.notes !== "string") {
    throw new Error("更新フィードの必須項目 (title, notes, downloadUrl) がありません。");
  }
  const downloadUrl = new URL(manifest.downloadUrl);
  if (downloadUrl.protocol !== "https:" || downloadUrl.username || downloadUrl.password) {
    throw new Error("更新ファイルURLは認証情報を含まないHTTPS URLにしてください。");
  }

  const currentVersion = app.getVersion();
  const available = isNewerVersion(manifest.version, currentVersion);
  latestUpdate = available
    ? {
        version: manifest.version,
        title: manifest.title,
        notes: manifest.notes,
        downloadUrl: downloadUrl.toString()
      }
    : null;
  const result = available
    ? { state: "available", currentVersion, ...latestUpdate }
    : { state: "up-to-date", currentVersion };
  if (available && mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send("updates:available", result);
  }
  return result;
}

ipcMain.handle("updates:get-config", async () => {
  const feedUrl = await readUpdateFeedUrl();
  return {
    configured: Boolean(feedUrl),
    feedUrl: feedUrl || "",
    currentVersion: app.getVersion()
  };
});

ipcMain.handle("updates:set-feed", async (_event, feedUrl) => {
  if (typeof feedUrl !== "string" || !feedUrl.trim()) {
    throw new Error("更新フィードのHTTPS URLを入力してください。");
  }
  const url = new URL(feedUrl.trim());
  if (url.protocol !== "https:" || url.username || url.password) {
    throw new Error("更新フィードには認証情報を含まないHTTPS URLを設定してください。");
  }
  await fs.writeFile(getUserDataPath(UPDATE_FEED_FILE), JSON.stringify({ url: url.toString() }, null, 2), "utf8");
  latestUpdate = null;
  return { configured: true };
});

ipcMain.handle("updates:check", () => checkForUpdates());

ipcMain.handle("updates:open-download", async () => {
  if (!latestUpdate) throw new Error("利用可能なアップデートがありません。");
  await shell.openExternal(latestUpdate.downloadUrl);
});

ipcMain.handle("library:download", async (_event, resourceId) => {
  const asset = LIBRARY_ASSETS[resourceId];
  if (!asset) throw new Error("指定された素材は見つかりません。");
  if (!mainWindow || mainWindow.isDestroyed()) throw new Error("保存先ダイアログを開けません。");

  const contents = await fs.readFile(path.join(__dirname, "assets", "library", asset.source));
  const extension = path.extname(asset.filename).slice(1);
  const result = await dialog.showSaveDialog(mainWindow, {
    title: "素材を保存",
    defaultPath: asset.filename,
    filters: [{ name: `${extension.toUpperCase()} ファイル`, extensions: [extension] }]
  });
  if (result.canceled) return { canceled: true };
  await fs.writeFile(result.filePath, contents);
  return { canceled: false, filename: path.basename(result.filePath) };
});

ipcMain.handle("library:open-booth", async (_event, productId) => {
  if (typeof productId !== "string" || !BOOTH_ITEM_IDS.has(productId)) {
    throw new Error("指定されたBOOTH商品は見つかりません。");
  }
  await shell.openExternal(`https://booth.pm/ja/items/${productId}`);
  return { opened: true };
});

ipcMain.handle("twitch:get-analytics", async () => {
  if (!twitchSession) throw new Error("実績を取得するにはTwitchにログインしてください。");
  const headers = {
    "Client-Id": twitchSession.clientId,
    Authorization: `Bearer ${twitchSession.accessToken}`
  };
  const videosPromise = twitchRequest(
    `${HELIX_URL}/videos?user_id=${encodeURIComponent(twitchSession.userId)}&type=archive&sort=time&first=20`,
    { headers }
  );
  const followersPromise = Array.isArray(twitchSession.scopes)
    && twitchSession.scopes.includes("moderator:read:followers")
    ? twitchRequest(
        `${HELIX_URL}/channels/followers?broadcaster_id=${encodeURIComponent(twitchSession.userId)}&first=1`,
        { headers }
      ).catch((error) => {
        if (error.status === 403) return null;
        throw error;
      })
    : Promise.resolve(null);
  const [videosResult, followersResult] = await Promise.all([videosPromise, followersPromise]);
  const videos = Array.isArray(videosResult.data) ? videosResult.data : [];
  return {
    followerCount: followersResult ? followersResult.total : null,
    followerPermissionRequired: !followersResult,
    videos: videos.map((video) => ({
      id: video.id,
      title: video.title,
      createdAt: video.created_at,
      viewCount: video.view_count,
      duration: video.duration,
      url: video.url
    }))
  };
});

ipcMain.handle("twitch:get-session", () => (
  twitchSession
    ? { state: "connected", user: getPublicUser(twitchSession) }
    : { state: "signed-out" }
));

ipcMain.handle("twitch:get-client-id-status", async () => ({
  configured: Boolean(await readClientId())
}));

ipcMain.handle("twitch:set-client-id", async (_event, clientId) => {
  if (typeof clientId !== "string" || !clientId.trim() || clientId.length > 128) {
    throw new Error("有効なTwitch Client IDを入力してください。");
  }
  await persistClientId(clientId.trim());
  if (twitchSession && twitchSession.clientId !== clientId.trim()) await clearSession();
  return { configured: true };
});

ipcMain.handle("twitch:start-login", async () => {
  if (pendingDeviceFlow || loginStartInProgress) throw new Error("Twitchの認証はすでに進行中です。");
  if (!safeStorage.isEncryptionAvailable()) {
    throw new Error("この端末では安全なトークン保存を利用できません。");
  }
  const clientId = await readClientId();
  if (!clientId) throw new Error("設定画面からTwitch Client IDを保存してください。");

  loginStartInProgress = true;
  loginStartCancelled = false;
  try {
    const result = await postForm(DEVICE_URL, {
      client_id: clientId.trim(),
      scopes: SCOPES
    });
    if (loginStartCancelled) throw new Error("Twitch認証をキャンセルしました。");
    if (!result.device_code || !result.user_code || !result.verification_uri || !result.expires_in || !result.interval) {
      throw new Error("Twitchから有効な認証コードを受け取れませんでした。");
    }

    const verificationUrl = new URL(result.verification_uri);
    if (verificationUrl.protocol !== "https:" || !["www.twitch.tv", "twitch.tv"].includes(verificationUrl.hostname)) {
      throw new Error("Twitchから不正な認証ページURLが返されました。");
    }

    const flow = {
      clientId: clientId.trim(),
      deviceCode: result.device_code,
      interval: result.interval,
      expiresAt: Date.now() + result.expires_in * 1000
    };
    pendingDeviceFlow = flow;
    await shell.openExternal(verificationUrl.toString());
    void pollDeviceFlow(flow).catch((error) => {
      if (pendingDeviceFlow !== flow) return;
      pendingDeviceFlow = null;
      console.error("Twitchログインに失敗しました:", error);
      sendTwitchStatus({ state: "error", message: error.message });
    });

    return {
      state: "pending",
      userCode: result.user_code,
      verificationUri: verificationUrl.toString(),
      expiresIn: result.expires_in
    };
  } catch (error) {
    pendingDeviceFlow = null;
    if (error.message === "Twitch認証をキャンセルしました。") throw error;
    throw new Error(`Twitch認証を開始できませんでした: ${error.message}`);
  } finally {
    loginStartInProgress = false;
    loginStartCancelled = false;
  }
});

ipcMain.on("twitch:cancel-login", () => {
  if (loginStartInProgress) {
    loginStartCancelled = true;
    return;
  }
  if (!pendingDeviceFlow) return;
  pendingDeviceFlow = null;
  sendTwitchStatus({ state: "cancelled" });
});

ipcMain.handle("twitch:logout", async () => {
  await clearSession();
  return { state: "signed-out" };
});

app.whenReady().then(async () => {
  await restoreSession();
  if (process.platform === "win32") app.setAppUserModelId("jp.streammate.studio");
  createWindow();
  sessionValidationTimer = setInterval(() => { void validateActiveSession(); }, 60 * 60 * 1000);
  updateCheckTimer = setInterval(() => {
    void checkForUpdates().catch((error) => console.error("更新チェックに失敗しました:", error));
  }, UPDATE_INTERVAL);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("before-quit", () => {
  if (sessionValidationTimer) clearInterval(sessionValidationTimer);
  if (updateCheckTimer) clearInterval(updateCheckTimer);
  pendingDeviceFlow = null;
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
