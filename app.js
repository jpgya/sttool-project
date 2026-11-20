const resources = [
  { id: "overlay", title: "Streammate 配信オーバーレイ", category: "配信画面", description: "OBSの画像ソースに追加して使える、透明背景の配信枠。", type: "SVG / 1920×1080", filename: "streammate-overlay.svg", file: "assets/library/overlay.svg", icon: "▧", art: "art-rose", label: "OBS向け" },
  { id: "starting", title: "配信開始カウントダウン", category: "アニメーション", description: "ブラウザーソースとして使える、15秒ループの待機画面。", type: "SVG / 1920×1080", filename: "starting-countdown.svg", file: "assets/library/starting-countdown.svg", icon: "◷", art: "art-sky", label: "ループ" },
  { id: "sound", title: "ふんわり通知サウンド", category: "サウンド", description: "フォローやコメント通知に使える、オリジナルの短いチャイム。", type: "WAV / 1秒", filename: "notification-chime.wav", file: "assets/library/notification-chime.wav", icon: "♫", art: "art-gold", label: "音声" },
  { id: "thumbnail", title: "配信サムネイルの作り方", category: "ガイド", description: "スマホでも伝わるサムネイルの作り方と公開前チェック。", type: "HTML / ガイド", filename: "thumbnail-guide.html", file: "assets/library/thumbnail-guide.html", icon: "▧", art: "art-coral", label: "ガイド" },
  { id: "chat", title: "コメント欄スタンプシート", category: "配信画面", description: "配信で使える12種類のメッセージスタンプ。画像として保存できます。", type: "SVG / 1200×800", filename: "chat-stamps.svg", file: "assets/library/chat-stamps.svg", icon: "☁", art: "art-lilac", label: "12種類" },
  { id: "planner", title: "配信企画プランナー", category: "テンプレート", description: "日付・企画・告知先・準備を記録する編集可能な表。", type: "CSV / 表計算", filename: "stream-planner.csv", file: "assets/library/planner.csv", icon: "✎", art: "art-green", label: "編集可" },
  { id: "endcard", title: "またね！エンドカード", category: "アニメーション", description: "次回予定を書き込める、ループアニメーション終了画面。", type: "SVG / 1920×1080", filename: "stream-endcard.svg", file: "assets/library/endcard.svg", icon: "✧", art: "art-pink", label: "ループ" },
  { id: "audio", title: "はじめての音声設定", category: "ガイド", description: "マイク・BGM・ノイズ対策を確認できる実用ガイド。", type: "HTML / ガイド", filename: "audio-setup-guide.html", file: "assets/library/audio-guide.html", icon: "◖", art: "art-aqua", label: "ガイド" },
  { id: "schedule", title: "週間配信スケジュール", category: "テンプレート", description: "曜日ごとの配信予定や告知日を書き込める表。", type: "CSV / 表計算", filename: "weekly-schedule.csv", file: "assets/library/schedule.csv", icon: "▦", art: "art-blue", label: "編集可" },
  { id: "alert", title: "応援ありがとうアラート", category: "アニメーション", description: "ブラウザーソースに追加できる、ループ式のお礼演出。", type: "SVG / 800×450", filename: "thank-you-alert.svg", file: "assets/library/alert.svg", icon: "✦", art: "art-gold", label: "ループ" },
  { id: "title", title: "配信タイトルのアイデア集", category: "ガイド", description: "配信内容を短く伝えるタイトルの型と公開前チェック。", type: "HTML / ガイド", filename: "title-ideas.html", file: "assets/library/title-guide.html", icon: "Aa", art: "art-rose", label: "ガイド" },
  { id: "scene", title: "ゆったり作業配信背景", category: "配信画面", description: "作業配信や勉強配信に使える、1920×1080の背景。", type: "SVG / 1920×1080", filename: "cozy-workspace.svg", file: "assets/library/scene.svg", icon: "⌂", art: "art-green", label: "背景" }
];

const boothResources = [
  {
    id: "booth-3471857", boothId: "3471857", title: "ネオン風ライブ配信オーバーレイ",
    creator: "よわまいSHOP", price: "無料（1枚）", tier: "free", category: "配信画面",
    description: "1920×1080の透過PNG。無料版1色、有料版は全8色セット。",
    terms: "個人・法人利用可／クレジット任意／再配布不可", icon: "▣", art: "booth-neon"
  },
  {
    id: "booth-2960573", boothId: "2960573", title: "コンデンサーマイク素材セット",
    creator: "うさねこメモリー", price: "無料", tier: "free", category: "配信小物",
    description: "3フレーム×カラーバリエーションのPNG素材。配信画面の小物に。",
    terms: "商用利用可（法人利用は事前連絡）／再配布不可", icon: "♫", art: "booth-mic"
  },
  {
    id: "booth-3277257", boothId: "3277257", title: "ホラー風ノイズのループ動画",
    creator: "rairai-product", price: "無料（MP4）", tier: "free", category: "動画背景",
    description: "ホラーゲームや怪談配信向けの、テレビノイズ風ループ背景。",
    terms: "動画概要欄にBOOTHまたは作者YouTubeを記載／再配布不可", icon: "▧", art: "booth-horror"
  },
  {
    id: "booth-7671590", boothId: "7671590", title: "ふわっと動くカスタム配信オーバーレイ",
    creator: "ひなたぼっこ", price: "¥1,900（無料サンプルあり）", tier: "paid", category: "配信画面",
    description: "OBS向けWebM・JSON一式。8色、色変更可。まずは無料サンプルで確認。",
    terms: "商用利用・改変可／再配布不可", icon: "✧", art: "booth-overlay"
  },
  {
    id: "booth-5871788", boothId: "5871788", title: "ドット絵アニメ配信画面セット",
    creator: "配信素材屋さん", price: "¥880", tier: "paid", category: "配信画面",
    description: "待機・終了画面、配信背景、ゲーム／カメラ／コメント枠のセット。",
    terms: "購入者は商用利用・編集可／再配布・共有不可", icon: "▦", art: "booth-pixel"
  },
  {
    id: "booth-6140047", boothId: "6140047", title: "OBS用・動くデジタル時計",
    creator: "テリー【Terry Shop】", price: "¥500〜（8色セット ¥1,500）", tier: "paid", category: "OBSウィジェット",
    description: "OBSブラウザーソース向けHTML時計。配信画面に置ける8色展開。",
    terms: "収益化配信で利用可・色改変可／クレジット不要／再配布不可", icon: "◷", art: "booth-clock"
  }
];

const initialEvents = [];
const sectionNames = { home: "ホーム", library: "素材ライブラリ", schedule: "配信スケジュール", growth: "成長レポート", analysis: "配信分析", settings: "設定" };
const pageContent = document.getElementById("page-content");
const sectionLabel = document.getElementById("current-section");
const dialog = document.getElementById("event-dialog");
let currentPage = "home";
let activeFilter = "すべて";
let searchQuery = "";
let events = readStorage("streammate-events", initialEvents);
let favorites = readStorage("streammate-favorites", []);
const defaultWorkspaceName = "花守 はなの配信部屋";
let workspaceName = loadWorkspaceName();
let monthOffset = 0;
let analyticsData = null;
let analyticsError = "";
let analyticsLoading = false;
let twitchClientIdConfigured = false;
let updateFeedUrl = "";
let currentAppVersion = "確認中";

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    console.error(`保存データの読み込みに失敗しました: ${key}`, error);
    return fallback;
  }
}

function loadWorkspaceName() {
  const savedName = readStorage("streammate-workspace-name", defaultWorkspaceName);
  return typeof savedName === "string" && savedName.trim()
    ? savedName.trim().slice(0, 40)
    : defaultWorkspaceName;
}

function saveStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`データの保存に失敗しました: ${key}`, error);
  }
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function formatDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`);
  return { day: date.getDate(), weekday: ["日", "月", "火", "水", "木", "金", "土"][date.getDay()] };
}

function sortedEvents() {
  return [...events].sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
}

function eventListMarkup(items) {
  if (!items.length) return '<div class="empty-state"><strong>予定はまだありません</strong>新しい配信をスケジュールしてみましょう。</div>';
  return items.map((event) => {
    const date = formatDate(event.date);
    return `<div class="upcoming-item">
      <div class="date-tile"><strong>${date.day}</strong><small>${date.weekday}曜日</small></div>
      <div class="event-copy"><strong>${escapeHTML(event.title)}</strong><small>${escapeHTML(event.time)} ・ ${escapeHTML(event.category)}</small></div>
      <span class="event-type">${escapeHTML(event.category)}</span>
    </div>`;
  }).join("");
}

function resourceCardsMarkup(items, compact = false) {
  return items.map((item) => compact
    ? `<article class="resource-card">
        <div class="resource-art ${item.art}"><span>${item.icon}</span></div>
        <div class="resource-info"><strong>${escapeHTML(item.title)}</strong><small>${escapeHTML(item.category)} ・ ${escapeHTML(item.type)}</small></div>
      </article>`
    : `<article class="library-card">
        <div class="library-art ${item.art}"><span class="art-emoji">${item.icon}</span>
          <button class="favorite-button ${favorites.includes(item.id) ? "is-favorite" : ""}" data-favorite="${item.id}" aria-label="${favorites.includes(item.id) ? "お気に入りを解除" : "お気に入りに追加"}">${favorites.includes(item.id) ? "♥" : "♡"}</button>
        </div>
        <div class="library-card-body">
          <div class="library-card-top"><h3>${escapeHTML(item.title)}</h3><span class="category-badge">${escapeHTML(item.category)}</span></div>
          <p>${escapeHTML(item.description)}</p>
          <div class="library-card-footer"><div class="card-meta"><span>${escapeHTML(item.type)}</span><strong>${escapeHTML(item.label)}</strong></div><button class="button button-quiet library-download" type="button" data-download-resource="${item.id}">↓ ダウンロード</button></div>
        </div>
      </article>`
  ).join("");
}

function heading(kicker, title, description, button = "") {
  return `<div class="page-heading"><div><span class="eyebrow">${kicker}</span><h1>${title}</h1><p>${description}</p></div>${button}</div>`;
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString("ja-JP");
}

function durationInSeconds(value) {
  const match = /^((\d+)h)?((\d+)m)?((\d+)s)?$/.exec(value || "");
  if (!match) return 0;
  return Number(match[2] || 0) * 3600 + Number(match[4] || 0) * 60 + Number(match[6] || 0);
}

function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return hours ? `${hours}時間 ${minutes}分` : `${minutes}分`;
}

function followerPermissionAction() {
  return '<button class="permission-cta" type="button" data-reauthorize-twitch>フォロワー閲覧を許可する →</button>';
}

function renderAnalyticsSummary() {
  if (twitchAuthState !== "connected" && twitchAuthState !== "unverified") {
    return `<div class="analytics-empty"><strong>Twitchの実データを表示</strong><span>アカウントを接続するとフォロワー数とアーカイブ実績を取得します。</span><button class="button button-quiet" data-open-twitch> Twitchに接続 →</button></div>`;
  }
  if (analyticsLoading) return '<div class="analytics-empty">Twitchから実績を取得しています…</div>';
  if (analyticsError) return `<div class="analytics-empty"><strong>実績を取得できませんでした</strong><span>${escapeHTML(analyticsError)}</span><button class="button button-quiet" data-refresh-analytics>再試行</button></div>`;
  if (!analyticsData) return '<div class="analytics-empty">Twitchの実データはまだありません。</div>';

  const videos = analyticsData.videos || [];
  const recentViews = videos.reduce((sum, video) => sum + Number(video.viewCount || 0), 0);
  const archiveSeconds = videos.reduce((sum, video) => sum + durationInSeconds(video.duration), 0);
  return `<section class="stats-grid">
    <article class="stat-card"><div class="stat-top"><span>Twitchフォロワー</span><span class="stat-icon">♧</span></div><div class="stat-value">${analyticsData.followerCount === null ? "許可が必要" : formatNumber(analyticsData.followerCount)}</div><div class="stat-note">${analyticsData.followerCount === null ? "Twitchから閲覧許可を取得します" : "Twitchから取得"}</div>${analyticsData.followerPermissionRequired ? followerPermissionAction() : ""}</article>
    <article class="stat-card"><div class="stat-top"><span>取得したアーカイブ</span><span class="stat-icon">▤</span></div><div class="stat-value">${formatNumber(videos.length)} <span style="font-size:12px">件</span></div><div class="stat-note">最新100件まで取得</div></article>
    <article class="stat-card"><div class="stat-top"><span>最新100件の再生数</span><span class="stat-icon">▶</span></div><div class="stat-value">${formatNumber(recentViews)}</div><div class="stat-note">公開アーカイブの累計</div></article>
    <article class="stat-card"><div class="stat-top"><span>最新100件の配信時間</span><span class="stat-icon">◷</span></div><div class="stat-value">${formatDuration(archiveSeconds)}</div><div class="stat-note">アーカイブ時間の合計</div></article>
  </section>`;
}

function renderRecentVideos() {
  if (analyticsLoading) return '<div class="empty-state">Twitchからアーカイブを取得しています…</div>';
  if (analyticsError) return `<div class="empty-state"><strong>取得エラー</strong>${escapeHTML(analyticsError)}<button class="text-link" data-refresh-analytics>再試行 →</button></div>`;
  if (!analyticsData || !analyticsData.videos.length) {
    return '<div class="empty-state"><strong>アーカイブはありません</strong>Twitchに公開アーカイブがある場合、ここに表示されます。</div>';
  }
  return `<div class="vod-list">${analyticsData.videos.map((video) => {
    const date = new Date(video.createdAt);
    const dateText = Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString("ja-JP");
    return `<div class="vod-row"><div class="vod-copy"><strong>${escapeHTML(video.title)}</strong><small>${dateText} ・ ${escapeHTML(video.duration)}</small></div><span>${formatNumber(video.viewCount)} 再生</span></div>`;
  }).join("")}</div>`;
}

function renderHome() {
  const upcoming = sortedEvents().slice(0, 3);
  const nextEvent = upcoming[0];
  return `${heading("WORKSPACE OVERVIEW", "ダッシュボード", "配信活動の状況と次の予定を確認できます。", '<button class="button button-primary" data-open-event>＋ 配信を予定する</button>')}
    <section class="workspace-summary">
      <div class="summary-icon">▦</div>
      <div class="summary-copy"><span class="eyebrow">次の配信</span><strong>${nextEvent ? `${escapeHTML(nextEvent.date.slice(5).replace("-", "/"))} ・ ${escapeHTML(nextEvent.time)}　${escapeHTML(nextEvent.title)}` : "配信予定はありません"}</strong></div>
      <span class="summary-status"><i></i>${nextEvent ? "予定あり" : "予定なし"}</span>
      <button class="button button-quiet summary-action" data-page-link="schedule">スケジュールを確認 <span>→</span></button>
    </section>
    ${renderAnalyticsSummary()}
    <section class="dashboard-grid">
      <article class="panel"><div class="panel-header"><div><h3>最近のアーカイブ</h3><p>Twitchから取得した最新の公開動画</p></div><button class="text-link" data-page="growth">実績を見る →</button></div>${renderRecentVideos()}</article>
      <article class="panel"><div class="panel-header"><div><h3>次の配信</h3><p>予定を立てて、みんなにお知らせ</p></div><button class="text-link" data-page-link="schedule">すべて見る →</button></div><div class="upcoming-list">${eventListMarkup(upcoming)}</div></article>
    </section>
    <section class="bottom-grid">
      <article class="panel"><div class="panel-header"><div><h3>クリエイターに人気の素材</h3><p>配信をもっと楽しくするアイテム</p></div><button class="text-link" data-page-link="library">ライブラリへ →</button></div><div class="resource-grid">${resourceCardsMarkup(resources.slice(0, 3), true)}</div></article>
      <article class="tip-card"><span class="tip-label">配信のヒント</span><h3>初めて来た人にも、配信内容が伝わるように</h3><p>配信のテーマや参加方法を固定コメントで案内しておくと、初見の視聴者も会話に入りやすくなります。</p><span class="tip-source">コミュニティづくり ・ 2分で読めます</span></article>
    </section>`;
}

function boothCardsMarkup(items) {
  return items.map((item) => `<article class="booth-card">
    <div class="booth-preview ${item.art}">
      <span class="booth-preview-icon">${item.icon}</span>
      <span class="booth-preview-label">${item.tier === "free" ? "FREE DOWNLOAD" : "CREATOR PICK"}</span>
      <span class="booth-preview-lines" aria-hidden="true"><i></i><i></i><i></i></span>
      <span class="booth-tier ${item.tier}">${item.tier === "free" ? "無料" : "有料"}</span>
      <button class="favorite-button ${favorites.includes(item.id) ? "is-favorite" : ""}" data-favorite="${item.id}" aria-label="${favorites.includes(item.id) ? "お気に入りを解除" : "お気に入りに追加"}">${favorites.includes(item.id) ? "♥" : "♡"}</button>
    </div>
    <div class="booth-card-body">
      <div class="booth-card-heading"><span class="booth-price">${escapeHTML(item.price)}</span><span class="category-badge">${escapeHTML(item.category)}</span></div>
      <h3>${escapeHTML(item.title)}</h3>
      <p class="booth-description">${escapeHTML(item.description)}</p>
      <div class="booth-creator">クリエイター <strong>${escapeHTML(item.creator)}</strong></div>
      <p class="booth-terms">${escapeHTML(item.terms)}</p>
      <button class="button button-quiet booth-open" type="button" data-open-booth="${item.boothId}">BOOTHで詳細を見る <span>↗</span></button>
    </div>
  </article>`).join("");
}

function renderLibrary() {
  const categories = ["すべて", "同梱素材", "BOOTH・無料", "BOOTH・有料"];
  const query = searchQuery.trim().toLocaleLowerCase();
  const showLocal = activeFilter === "すべて" || activeFilter === "同梱素材";
  const showBooth = activeFilter !== "同梱素材";
  const localItems = showLocal ? resources.filter((resource) => (
    !query || `${resource.title} ${resource.category} ${resource.description}`.toLocaleLowerCase().includes(query)
  )) : [];
  const boothItems = showBooth ? boothResources.filter((resource) => {
    const matchesTier = activeFilter === "すべて"
      || (activeFilter === "BOOTH・無料" && resource.tier === "free")
      || (activeFilter === "BOOTH・有料" && resource.tier === "paid");
    const searchable = `${resource.title} ${resource.creator} ${resource.category} ${resource.description} ${resource.price} ${resource.terms}`.toLocaleLowerCase();
    return matchesTier && (!query || searchable.includes(query));
  }) : [];
  const totalItems = localItems.length + boothItems.length;
  const sections = [
    boothItems.length && `<section class="library-section"><div class="library-section-heading"><div><span class="eyebrow">CURATED ON BOOTH</span><h2>クリエイターのおすすめ素材</h2><p>無料版から本格セットまで。購入・利用条件は各商品ページで確認してください。</p></div><span class="category-badge">${boothItems.filter((item) => item.tier === "free").length} 無料 ・ ${boothItems.filter((item) => item.tier === "paid").length} 有料</span></div><div class="booth-grid">${boothCardsMarkup(boothItems)}</div></section>`,
    localItems.length && `<section class="library-section"><div class="library-section-heading"><div><span class="eyebrow">READY TO USE</span><h2>すぐ使える同梱素材</h2><p>ダウンロード先を選んで保存できます。</p></div></div><div class="library-grid">${resourceCardsMarkup(localItems)}</div></section>`
  ].filter(Boolean).join("");
  return `${heading("CREATOR RESOURCE LIBRARY", "素材ライブラリ", "無料・有料のBOOTH素材と、すぐ使えるオリジナル素材をまとめました。")}
    <div class="section-toolbar"><div class="filter-tabs">${categories.map((category) => `<button class="filter-tab ${activeFilter === category ? "active" : ""}" data-filter="${category}">${category}</button>`).join("")}</div><span class="eyebrow">${totalItems} ITEMS</span></div>
    <p class="library-status" id="library-status" role="status" aria-live="polite"></p>
    ${sections || '<div class="empty-state"><strong>素材が見つかりませんでした</strong>検索ワードやカテゴリを変えて、もう一度お試しください。</div>'}
    <p class="library-disclaimer">BOOTH素材は各クリエイターの公式商品ページへ移動します。アプリには商品ファイルを転載していません。価格・配布状況・利用条件は変更されることがあるため、利用前に商品ページをご確認ください。</p>`;
}

async function downloadLibraryResource(resourceId, button) {
  const status = document.getElementById("library-status");
  if (!window.streammateLibrary) {
    status.textContent = "素材の保存はElectronアプリからご利用ください。";
    return;
  }

  button.disabled = true;
  status.textContent = "保存先を選択してください…";
  try {
    const result = await window.streammateLibrary.download(resourceId);
    status.textContent = result.canceled ? "ダウンロードをキャンセルしました。" : `${result.filename}を保存しました。`;
  } catch (error) {
    status.textContent = `素材を保存できませんでした: ${error.message}`;
    console.error("素材を保存できませんでした:", error);
  } finally {
    button.disabled = false;
  }
}

async function openBoothProduct(productId, button) {
  const status = document.getElementById("library-status");
  if (!window.streammateLibrary) {
    status.textContent = "BOOTHの商品ページはElectronアプリから開いてください。";
    return;
  }

  button.disabled = true;
  status.textContent = "BOOTHの商品ページを開いています…";
  try {
    await window.streammateLibrary.openBooth(productId);
    status.textContent = "商品ページをブラウザーで開きました。価格や利用条件をご確認ください。";
  } catch (error) {
    status.textContent = `商品ページを開けませんでした: ${error.message}`;
    console.error("BOOTH商品ページを開けませんでした:", error);
  } finally {
    button.disabled = false;
  }
}

function monthData() {
  const currentDate = new Date();
  const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + monthOffset, 1);
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const previousMonthDays = new Date(year, month, 0).getDate();
  const cells = [];
  for (let i = 0; i < 42; i++) {
    let day = i - firstDay + 1;
    let inMonth = true;
    if (day < 1) { day = previousMonthDays + day; inMonth = false; }
    if (day > daysInMonth) { day -= daysInMonth; inMonth = false; }
    const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const event = events.find((item) => item.date === dateKey);
    const isToday = year === currentDate.getFullYear() && month === currentDate.getMonth() && day === currentDate.getDate() && inMonth;
    cells.push(`<div class="calendar-day ${inMonth ? "" : "muted"} ${isToday ? "today" : ""}"><span>${day}</span>${event ? `<div class="calendar-event ${event.category === "雑談" ? "green" : ""}" title="${escapeHTML(event.title)}">${escapeHTML(event.time)} ${escapeHTML(event.title)}</div>` : ""}</div>`);
  }
  return { title: `${year}年 ${month + 1}月`, cells: cells.join("") };
}

function renderSchedule() {
  const calendar = monthData();
  return `${heading("MAKE IT A DATE", "配信スケジュール", "配信予定をまとめて、視聴者との約束をつくろう。", '<button class="button button-primary" data-open-event>＋ 配信を予定する</button>')}
    <div class="schedule-layout">
      <section class="schedule-panel"><div class="calendar-head"><h2>${calendar.title}</h2><div class="calendar-nav"><button data-month="-1" aria-label="前の月">‹</button><button data-month="1" aria-label="次の月">›</button></div></div>
      <div class="calendar-grid">${["日", "月", "火", "水", "木", "金", "土"].map((day) => `<div class="calendar-day-name">${day}</div>`).join("")}${calendar.cells}</div></section>
      <aside class="schedule-panel schedule-sidebar"><h3>これからの配信</h3><div class="upcoming-list">${eventListMarkup(sortedEvents())}</div><div class="schedule-note">💡 <strong>お知らせのコツ</strong><br>予定が決まったら早めにSNSで告知すると、視聴者も参加しやすくなります。</div></aside>
    </div>`;
}

function renderGrowth() {
  const unavailable = twitchAuthState !== "connected" && twitchAuthState !== "unverified";
  let content = "";
  if (unavailable) {
    content = '<div class="analytics-empty"><strong>Twitchに接続してください</strong><span>ログインすると、フォロワー数と公開アーカイブの実数を表示します。</span><button class="button button-quiet" data-open-twitch>Twitchに接続 →</button></div>';
  } else if (analyticsLoading) {
    content = '<div class="analytics-empty">Twitchから実績を取得しています…</div>';
  } else if (analyticsError) {
    content = `<div class="analytics-empty"><strong>実績を取得できませんでした</strong><span>${escapeHTML(analyticsError)}</span><button class="button button-quiet" data-refresh-analytics>再試行</button></div>`;
  } else if (!analyticsData) {
    content = '<div class="analytics-empty">実績データがまだありません。</div>';
  } else {
    const videos = analyticsData.videos || [];
    const totalViews = videos.reduce((sum, video) => sum + Math.max(0, Number(video.viewCount) || 0), 0);
    const totalSeconds = videos.reduce((sum, video) => sum + durationInSeconds(video.duration), 0);
    const averageViews = videos.length ? Math.round(totalViews / videos.length) : 0;
    const topVideo = [...videos].sort((a, b) => (Number(b.viewCount) || 0) - (Number(a.viewCount) || 0))[0];
    content = `<div class="growth-grid">
      <div class="growth-card"><small>現在のフォロワー数</small><strong>${analyticsData.followerCount === null ? "許可が必要" : formatNumber(analyticsData.followerCount)}</strong><span>${analyticsData.followerCount === null ? "Twitchから閲覧許可を取得します" : "Twitchから取得"}</span>${analyticsData.followerPermissionRequired ? followerPermissionAction() : ""}</div>
      <div class="growth-card"><small>取得したアーカイブ</small><strong>${formatNumber(videos.length)} 件</strong><span>最新100件まで取得</span></div>
      <div class="growth-card"><small>アーカイブ平均再生数</small><strong>${formatNumber(averageViews)}</strong><span>${videos.length ? "最新アーカイブの累計再生数から算出" : "対象アーカイブなし"}</span></div>
      <div class="growth-card"><small>アーカイブ合計時間</small><strong>${formatDuration(totalSeconds)}</strong><span>取得した公開動画の長さ</span></div>
    </div>
    <div class="insight-row">
      <div class="insight-box"><strong>最も再生されたアーカイブ</strong>${topVideo ? `${escapeHTML(topVideo.title)}（${formatNumber(topVideo.viewCount)} 再生）` : "公開アーカイブはありません。"}</div>
      <div class="insight-box"><strong>数値について</strong>再生数はTwitchが返す各アーカイブの累計です。フォロワーの過去推移やライブ同時視聴者数は、このデータから推測していません。</div>
    </div>
    <section class="growth-chart-panel"><div class="panel-header"><div><h3>公開アーカイブ</h3><p>タイトル・公開日時・再生数はTwitchの実データです。</p></div><button class="text-link" data-page-link="analysis">詳しく分析 →</button></div>${renderRecentVideos()}</section>`;
  }
  return `${heading("TWITCH CHANNEL DATA", "成長レポート", "Twitchで確認できる現在値と公開アーカイブをまとめます。", '<button class="button button-quiet" data-refresh-analytics>更新 ↻</button>')}${content}`;
}

function analysisBreakdownRows(items, maximumViews) {
  return items.map((item) => {
    const width = maximumViews ? Math.round(item.views / maximumViews * 100) : 0;
    return `<div class="analysis-breakdown-row"><span>${escapeHTML(item.label)}</span><div class="analysis-bar-track"><span style="width:${width}%"></span></div><strong>${formatNumber(item.views)}<small>${item.count}件</small></strong></div>`;
  }).join("");
}

function renderAnalysis() {
  const unavailable = twitchAuthState !== "connected" && twitchAuthState !== "unverified";
  if (unavailable) {
    return `${heading("STREAM PERFORMANCE", "配信分析", "Twitchに接続して、公開アーカイブの実データを分析します。")}
      <div class="analytics-empty"><strong>Twitchに接続してください</strong><span>アーカイブごとの再生数、配信時間、公開曜日・時間帯を集計します。</span><button class="button button-quiet" data-open-twitch>Twitchに接続 →</button></div>`;
  }
  if (analyticsLoading) {
    return `${heading("STREAM PERFORMANCE", "配信分析", "最新100件の公開アーカイブを読み込んでいます。")}<div class="analytics-empty">Twitchから実績を取得しています…</div>`;
  }
  if (analyticsError) {
    return `${heading("STREAM PERFORMANCE", "配信分析", "Twitchから取得した実数を集計します。")}<div class="analytics-empty"><strong>分析データを取得できませんでした</strong><span>${escapeHTML(analyticsError)}</span><button class="button button-quiet" data-refresh-analytics>再試行</button></div>`;
  }
  if (!analyticsData) {
    return `${heading("STREAM PERFORMANCE", "配信分析", "Twitchから取得した実数を集計します。")}<div class="analytics-empty">分析データがまだありません。</div>`;
  }

  const videos = analyticsData.videos || [];
  const totalViews = videos.reduce((sum, video) => sum + Math.max(0, Number(video.viewCount) || 0), 0);
  const totalSeconds = videos.reduce((sum, video) => sum + durationInSeconds(video.duration), 0);
  const averageViews = videos.length ? Math.round(totalViews / videos.length) : 0;
  const averageDuration = videos.length ? Math.round(totalSeconds / videos.length) : 0;
  const rankedVideos = [...videos].sort((a, b) => Number(b.viewCount) - Number(a.viewCount)).slice(0, 5);
  const maxVideoViews = Math.max(0, ...rankedVideos.map((video) => Number(video.viewCount) || 0));
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"].map((label) => ({ label: `${label}曜日`, views: 0, count: 0 }));
  const timeRanges = [
    { label: "0〜5時", views: 0, count: 0 },
    { label: "6〜11時", views: 0, count: 0 },
    { label: "12〜17時", views: 0, count: 0 },
    { label: "18〜23時", views: 0, count: 0 }
  ];
  videos.forEach((video) => {
    const date = new Date(video.createdAt);
    if (Number.isNaN(date.getTime())) return;
    const views = Math.max(0, Number(video.viewCount) || 0);
    const weekday = weekdays[date.getDay()];
    weekday.views += views;
    weekday.count++;
    const timeRange = timeRanges[Math.floor(date.getHours() / 6)];
    timeRange.views += views;
    timeRange.count++;
  });
  const maxWeekdayViews = Math.max(0, ...weekdays.map((item) => item.views));
  const maxTimeViews = Math.max(0, ...timeRanges.map((item) => item.views));
  const topRows = rankedVideos.length
    ? rankedVideos.map((video, index) => {
        const views = Math.max(0, Number(video.viewCount) || 0);
        const width = maxVideoViews ? Math.round(views / maxVideoViews * 100) : 0;
        const date = new Date(video.createdAt);
        const dateText = Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString("ja-JP");
        return `<div class="analysis-rank-row"><span class="analysis-rank-number">${String(index + 1).padStart(2, "0")}</span><div class="analysis-rank-copy"><strong>${escapeHTML(video.title)}</strong><small>${dateText} ・ ${escapeHTML(video.duration)}</small><div class="analysis-bar-track"><span style="width:${width}%"></span></div></div><strong class="analysis-rank-views">${formatNumber(views)}<small>再生</small></strong></div>`;
      }).join("")
    : '<div class="empty-state">公開アーカイブはありません。</div>';
  const breakdownMarkup = (items, maximum) => items.some((item) => item.count)
    ? analysisBreakdownRows(items, maximum)
    : '<div class="analysis-no-data">集計できる公開アーカイブがありません。</div>';
  const permissionNotice = analyticsData.followerPermissionRequired
    ? `<div class="analysis-permission-notice"><span>フォロワー数の取得にはTwitchの追加許可が必要です。</span>${followerPermissionAction()}</div>`
    : "";

  return `${heading("STREAM PERFORMANCE", "配信分析", "公開アーカイブ最大100件から、実際の再生数・配信時間・公開日時の傾向を確認できます。", '<button class="button button-quiet" data-refresh-analytics>更新 ↻</button>')}
    ${permissionNotice}
    <div class="analysis-kpi-grid">
      <article class="analysis-kpi"><span>対象アーカイブ</span><strong>${formatNumber(videos.length)}<small>件</small></strong><em>最新100件まで</em></article>
      <article class="analysis-kpi"><span>累計再生数</span><strong>${formatNumber(totalViews)}</strong><em>取得時点の各動画合計</em></article>
      <article class="analysis-kpi"><span>1本あたり平均再生数</span><strong>${formatNumber(averageViews)}</strong><em>${videos.length ? "累計再生数 ÷ 対象本数" : "対象なし"}</em></article>
      <article class="analysis-kpi"><span>平均配信時間</span><strong>${formatDuration(averageDuration)}</strong><em>アーカイブ長から算出</em></article>
    </div>
    <p class="analysis-data-note">再生数は各アーカイブの累計値です。公開からの経過日数による補正、過去のフォロワー推移、同時視聴者数は含めていません。</p>
    <div class="analysis-panels">
      <section class="panel analysis-panel"><div class="panel-header"><div><h3>再生数ランキング</h3><p>取得した公開アーカイブの上位5件</p></div></div><div class="analysis-ranking">${topRows}</div></section>
      <section class="panel analysis-panel"><div class="panel-header"><div><h3>公開曜日別の累計再生数</h3><p>アーカイブ作成日時の端末ローカル曜日</p></div></div>${breakdownMarkup(weekdays, maxWeekdayViews)}</section>
      <section class="panel analysis-panel"><div class="panel-header"><div><h3>公開時間帯別の累計再生数</h3><p>アーカイブ作成日時の端末ローカル時刻</p></div></div>${breakdownMarkup(timeRanges, maxTimeViews)}</section>
      <section class="panel analysis-panel"><div class="panel-header"><div><h3>最近のアーカイブ</h3><p>最新の公開動画一覧</p></div><button class="text-link" data-page="growth">成長レポート →</button></div>${renderRecentVideos()}</section>
    </div>`;
}

function renderSettings() {
  return `${heading("MAKE IT YOURS", "設定", "アプリの表示やワークスペースをカスタマイズできます。")}
    <section class="settings-panel">
      <div class="settings-row"><div><strong>Twitchアカウント</strong><small>Client IDは画面に表示せず、端末内に暗号化して保存します。</small></div><div class="settings-action-group"><span class="category-badge" id="twitch-config-status">${twitchClientIdConfigured ? "Client ID設定済み" : "未設定"}</span><button class="button button-quiet" data-open-twitch>設定</button></div></div>
      <div class="settings-row"><div><strong>アップデート通知</strong><small>HTTPSのJSON更新フィードを設定すると、起動時・1日ごとに更新を確認します。</small></div><div class="settings-action-group"><span class="category-badge">${updateFeedUrl ? "設定済み" : "更新元未設定"}</span><button class="button button-quiet" data-check-update>今すぐ確認</button></div></div>
      <div class="settings-row feed-url-row"><label for="update-feed-url"><strong>更新フィードURL</strong><small>公開するupdate.jsonのHTTPS URL</small></label><div class="twitch-settings-field"><input id="update-feed-url" type="url" value="${escapeHTML(updateFeedUrl)}" placeholder="https://example.com/streammate/update.json"><button class="button button-quiet" id="save-update-feed" type="button">保存</button></div></div>
      <div class="settings-row"><div><strong>ワークスペース名</strong><small>名前を入力して保存してください（40文字まで）</small></div><form class="twitch-settings-field workspace-name-field" id="workspace-name-form"><input id="workspace-name-input" type="text" maxlength="40" required value="${escapeHTML(workspaceName)}" aria-label="ワークスペース名"><button class="button button-quiet" type="submit">保存</button></form></div>
      <div class="settings-row"><div><strong>表示言語</strong><small>アプリで使用する言語</small></div><select aria-label="表示言語"><option>日本語</option><option>English</option></select></div>
      <div class="settings-row"><div><strong>データの保存先</strong><small>スケジュールやお気に入りの保存場所</small></div><span class="category-badge">この端末内</span></div>
      <div class="settings-row"><div><strong>Streammate Studio</strong><small>配信者のためのクリエイタースタジオ</small></div><span>バージョン ${escapeHTML(currentAppVersion)}</span></div>
    </section>`;
}

function render() {
  sectionLabel.textContent = sectionNames[currentPage];
  document.getElementById("workspace-name-sidebar").textContent = workspaceName;
  document.getElementById("workspace-name-breadcrumb").textContent = workspaceName;
  document.querySelectorAll(".nav-link[data-page]").forEach((link) => link.classList.toggle("active", link.dataset.page === currentPage));
  const views = { home: renderHome, library: renderLibrary, schedule: renderSchedule, growth: renderGrowth, analysis: renderAnalysis, settings: renderSettings };
  pageContent.innerHTML = views[currentPage]();
}

function navigate(page) {
  if (!sectionNames[page]) return;
  currentPage = page;
  if (page !== "library") {
    searchQuery = "";
    document.getElementById("global-search").value = "";
  }
  render();
}

document.addEventListener("click", (event) => {
  const nav = event.target.closest("[data-page]");
  const pageLink = event.target.closest("[data-page-link]");
  const filter = event.target.closest("[data-filter]");
  const favorite = event.target.closest("[data-favorite]");
  const monthButton = event.target.closest("[data-month]");
  const downloadResource = event.target.closest("[data-download-resource]");
  const openBooth = event.target.closest("[data-open-booth]");
  const openTwitch = event.target.closest("[data-open-twitch]");
  const reauthorizeTwitchButton = event.target.closest("[data-reauthorize-twitch]");
  const refreshAnalytics = event.target.closest("[data-refresh-analytics]");
  const checkUpdate = event.target.closest("[data-check-update]");
  const saveUpdateFeedButton = event.target.closest("#save-update-feed");
  if (nav) navigate(nav.dataset.page);
  if (pageLink) navigate(pageLink.dataset.pageLink);
  if (filter) { activeFilter = filter.dataset.filter; render(); }
  if (favorite) {
    const id = favorite.dataset.favorite;
    favorites = favorites.includes(id) ? favorites.filter((item) => item !== id) : [...favorites, id];
    saveStorage("streammate-favorites", favorites);
    render();
  }
  if (monthButton) { monthOffset += Number(monthButton.dataset.month); render(); }
  if (event.target.closest("[data-open-event]")) openEventDialog();
  if (openTwitch) openTwitchDialog();
  if (reauthorizeTwitchButton) void reauthorizeTwitch();
  if (downloadResource) void downloadLibraryResource(downloadResource.dataset.downloadResource, downloadResource);
  if (openBooth) void openBoothProduct(openBooth.dataset.openBooth, openBooth);
  if (refreshAnalytics) loadAnalytics();
  if (checkUpdate) openUpdateDialog(true);
  if (saveUpdateFeedButton) saveUpdateFeed();
});

document.addEventListener("submit", (event) => {
  if (event.target.id !== "workspace-name-form") return;
  event.preventDefault();
  const input = document.getElementById("workspace-name-input");
  input.setCustomValidity("");
  const name = input.value.trim();
  if (!name) {
    input.setCustomValidity("ワークスペース名を入力してください。");
    input.reportValidity();
    return;
  }
  workspaceName = name.slice(0, 40);
  saveStorage("streammate-workspace-name", workspaceName);
  render();
});

document.getElementById("global-search").addEventListener("input", (event) => {
  searchQuery = event.target.value;
  if (searchQuery && currentPage !== "library") currentPage = "library";
  if (currentPage === "library") render();
});

function openEventDialog() {
  const dateInput = dialog.querySelector('input[name="date"]');
  const localToday = new Date();
  dateInput.value = `${localToday.getFullYear()}-${String(localToday.getMonth() + 1).padStart(2, "0")}-${String(localToday.getDate()).padStart(2, "0")}`;
  dialog.showModal();
}

document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
document.querySelector(".dialog-cancel").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
document.getElementById("event-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  events = [...events, {
    title: formData.get("title").trim(),
    date: formData.get("date"),
    time: formData.get("time"),
    category: formData.get("category")
  }];
  saveStorage("streammate-events", events);
  dialog.close();
  event.currentTarget.reset();
  navigate("schedule");
});

const twitchDialog = document.getElementById("twitch-dialog");
const twitchClientInput = document.getElementById("twitch-client-id");
const twitchSetupPanel = document.getElementById("twitch-setup-panel");
const twitchConnectPanel = document.getElementById("twitch-connect-panel");
const twitchPendingPanel = document.getElementById("twitch-pending-panel");
const twitchConnectedPanel = document.getElementById("twitch-connected-panel");
const twitchErrorPanel = document.getElementById("twitch-error-panel");
const updateDialog = document.getElementById("update-dialog");
const updateAvailablePanel = document.getElementById("update-available-panel");
const updateStatusPanel = document.getElementById("update-status-panel");
let twitchAuthState = "signed-out";
let availableUpdate = null;

function showTwitchPanel(panel) {
  [twitchSetupPanel, twitchConnectPanel, twitchPendingPanel, twitchConnectedPanel, twitchErrorPanel]
    .forEach((item) => { item.hidden = item !== panel; });
}

function updateTwitchAccount(status) {
  twitchAuthState = status.state;
  const name = document.getElementById("twitch-account-name");
  const subtitle = document.getElementById("twitch-account-status");
  const connectButton = document.getElementById("twitch-connect-button");
  const user = status.user;

  if (user) {
    name.textContent = `@${user.login}`;
    subtitle.textContent = status.state === "unverified" ? "接続を確認できません" : "Twitchに接続済み";
    connectButton.innerHTML = `<span class="twitch-letter">t</span>@${escapeHTML(user.login)}`;
  } else {
    name.textContent = "Twitch未接続";
    subtitle.textContent = "クリックしてログイン";
    connectButton.innerHTML = '<span class="twitch-letter">t</span>Twitchに接続';
  }
}

function openTwitchDialog() {
  twitchClientInput.value = "";
  if (twitchAuthState === "connected" || twitchAuthState === "unverified") {
    const user = document.getElementById("twitch-account-name").textContent;
    document.getElementById("twitch-connected-name").textContent = user;
    document.getElementById("twitch-connected-note").textContent =
      twitchAuthState === "unverified"
        ? "接続状態を確認できていません。ネットワークを確認してください。"
        : "追加のアクセス許可が必要な場合は「権限を更新」からTwitchで再認証してください。";
    showTwitchPanel(twitchConnectedPanel);
  } else {
    showTwitchPanel(twitchClientIdConfigured ? twitchConnectPanel : twitchSetupPanel);
  }
  twitchDialog.showModal();
  if (window.streammateTwitch) {
    window.streammateTwitch.getClientIdStatus()
      .then((status) => {
        twitchClientIdConfigured = status.configured;
        if (twitchAuthState === "signed-out" && twitchDialog.open) {
          showTwitchPanel(status.configured ? twitchConnectPanel : twitchSetupPanel);
        }
      })
      .catch((error) => console.error("Twitch設定の確認に失敗しました:", error));
  }
}

async function saveTwitchClientId() {
  const clientId = twitchClientInput.value.trim();
  if (!clientId) {
    document.getElementById("twitch-error-message").textContent = "Twitch Client IDを入力してください。";
    showTwitchPanel(twitchErrorPanel);
    return;
  }
  if (!window.streammateTwitch) {
    document.getElementById("twitch-error-message").textContent = "TwitchログインはElectronアプリからご利用ください。";
    showTwitchPanel(twitchErrorPanel);
    return;
  }
  const saveButton = document.getElementById("twitch-save-client-id");
  saveButton.disabled = true;
  try {
    await window.streammateTwitch.setClientId(clientId);
    twitchClientIdConfigured = true;
    twitchClientInput.value = "";
    showTwitchPanel(twitchConnectPanel);
    render();
  } catch (error) {
    document.getElementById("twitch-error-message").textContent = error.message;
    showTwitchPanel(twitchErrorPanel);
  } finally {
    saveButton.disabled = false;
  }
}

async function beginTwitchLogin() {
  if (!window.streammateTwitch) {
    document.getElementById("twitch-error-message").textContent = "TwitchログインはElectronアプリからご利用ください。";
    showTwitchPanel(twitchErrorPanel);
    return;
  }
  const previousAuthState = twitchAuthState;
  twitchAuthState = "pending";
  document.getElementById("twitch-start-login").disabled = true;
  document.getElementById("twitch-cancel-login").disabled = true;
  document.getElementById("twitch-dialog-close").disabled = true;
  showTwitchPanel(twitchPendingPanel);
  document.getElementById("twitch-auth-status").textContent = "認証コードを準備しています…";
  try {
    const result = await window.streammateTwitch.startLogin();
    document.getElementById("twitch-device-code").textContent = result.userCode;
    document.getElementById("twitch-auth-status").textContent =
      `認証ページを開きました。${Math.floor(result.expiresIn / 60)}分以内にコードを入力してください。`;
    document.getElementById("twitch-cancel-login").disabled = false;
    document.getElementById("twitch-dialog-close").disabled = false;
  } catch (error) {
    twitchAuthState = previousAuthState === "connected" || previousAuthState === "unverified" ? previousAuthState : "signed-out";
    document.getElementById("twitch-error-message").textContent = error.message;
    showTwitchPanel(twitchErrorPanel);
  } finally {
    document.getElementById("twitch-start-login").disabled = false;
  }
}

async function reauthorizeTwitch() {
  if (!window.streammateTwitch) {
    openTwitchDialog();
    return;
  }
  if (!twitchDialog.open) twitchDialog.showModal();
  try {
    const status = await window.streammateTwitch.getClientIdStatus();
    twitchClientIdConfigured = status.configured;
    if (!status.configured) {
      showTwitchPanel(twitchSetupPanel);
      return;
    }
    await beginTwitchLogin();
  } catch (error) {
    document.getElementById("twitch-error-message").textContent = `権限の更新を開始できませんでした: ${error.message}`;
    showTwitchPanel(twitchErrorPanel);
  }
}

document.getElementById("twitch-connect-button").addEventListener("click", openTwitchDialog);
document.getElementById("twitch-account-button").addEventListener("click", openTwitchDialog);
document.getElementById("twitch-save-client-id").addEventListener("click", saveTwitchClientId);
document.getElementById("twitch-start-login").addEventListener("click", beginTwitchLogin);
document.getElementById("twitch-reauthorize").addEventListener("click", reauthorizeTwitch);
document.getElementById("twitch-change-client-id").addEventListener("click", () => {
  twitchClientIdConfigured = false;
  showTwitchPanel(twitchSetupPanel);
});
document.getElementById("twitch-dialog-close").addEventListener("click", () => {
  if (twitchAuthState === "pending") window.streammateTwitch?.cancelLogin();
  twitchDialog.close();
});
twitchDialog.addEventListener("cancel", (event) => {
  if (twitchAuthState === "pending") {
    event.preventDefault();
    window.streammateTwitch?.cancelLogin();
    twitchDialog.close();
  }
});
document.getElementById("twitch-cancel-login").addEventListener("click", () => {
  window.streammateTwitch?.cancelLogin();
  twitchDialog.close();
});
document.getElementById("twitch-done").addEventListener("click", () => twitchDialog.close());
document.getElementById("twitch-error-close").addEventListener("click", () => twitchDialog.close());
document.getElementById("twitch-retry-login").addEventListener("click", () => showTwitchPanel(twitchSetupPanel));
document.getElementById("twitch-logout").addEventListener("click", async () => {
  try {
    await window.streammateTwitch.logout();
    showTwitchPanel(twitchClientIdConfigured ? twitchConnectPanel : twitchSetupPanel);
  } catch (error) {
    document.getElementById("twitch-error-message").textContent = error.message;
    showTwitchPanel(twitchErrorPanel);
  }
});
if (window.streammateTwitch) {
  window.streammateTwitch.onStatus((status) => {
    updateTwitchAccount(status);
    if (status.state === "connected") {
      document.getElementById("twitch-connected-name").textContent = `@${status.user.login}`;
      document.getElementById("twitch-connected-note").textContent = "";
      if (twitchDialog.open) showTwitchPanel(twitchConnectedPanel);
      void loadAnalytics();
    } else if (status.state === "signed-out") {
      analyticsData = null;
      analyticsError = "";
      if (currentPage === "home" || currentPage === "growth" || currentPage === "analysis") render();
    } else if (status.state === "error") {
      document.getElementById("twitch-error-message").textContent = status.message;
      if (twitchDialog.open) showTwitchPanel(twitchErrorPanel);
      void window.streammateTwitch.getSession()
        .then((session) => {
          updateTwitchAccount(session);
          if (session.state === "connected") void loadAnalytics();
          else if (currentPage === "home" || currentPage === "growth" || currentPage === "analysis") render();
        })
        .catch((error) => console.error("Twitchのログイン状態を再確認できませんでした:", error));
    } else if (status.state === "unverified") {
      document.getElementById("twitch-connected-note").textContent = status.message;
    }
  });

  window.streammateTwitch.getSession()
    .then((status) => {
      updateTwitchAccount(status);
      if (status.state === "connected") void loadAnalytics();
    })
    .catch((error) => console.error("Twitchのログイン状態を取得できませんでした:", error));
}

async function loadAnalytics() {
  if (!window.streammateTwitch || analyticsLoading || twitchAuthState !== "connected") return;
  analyticsLoading = true;
  analyticsError = "";
  if (currentPage === "home" || currentPage === "growth" || currentPage === "analysis") render();
  try {
    analyticsData = await window.streammateTwitch.getAnalytics();
  } catch (error) {
    analyticsError = error.message;
  } finally {
    analyticsLoading = false;
    if (currentPage === "home" || currentPage === "growth" || currentPage === "analysis") render();
  }
}

function showUpdate(update) {
  availableUpdate = update;
  document.getElementById("update-indicator").hidden = false;
  document.getElementById("update-current-version").textContent = `現在のバージョン: ${update.currentVersion}`;
  document.getElementById("update-version").textContent = `VERSION ${update.version}`;
  document.getElementById("update-title").textContent = update.title;
  document.getElementById("update-notes").textContent = update.notes;
  updateAvailablePanel.hidden = false;
  updateStatusPanel.hidden = true;
  if (!updateDialog.open && !document.querySelector("dialog[open]")) updateDialog.showModal();
}

async function checkUpdates(showErrors = true) {
  if (!window.streammateUpdates) {
    document.getElementById("update-status-message").textContent = "アップデート確認はElectronアプリからご利用ください。";
    return;
  }
  document.getElementById("update-status-message").textContent = "更新を確認しています…";
  try {
    const result = await window.streammateUpdates.check();
    document.getElementById("update-current-version").textContent = `現在のバージョン: ${result.currentVersion}`;
    if (result.state === "available") {
      showUpdate(result);
    } else {
      availableUpdate = null;
      document.getElementById("update-indicator").hidden = true;
      updateAvailablePanel.hidden = true;
      updateStatusPanel.hidden = false;
      document.getElementById("update-status-message").textContent =
        result.state === "not-configured" ? "更新フィードが未設定です。設定画面で公開HTTPS URLを登録してください。" : "このアプリは最新バージョンです。";
    }
  } catch (error) {
    updateAvailablePanel.hidden = true;
    updateStatusPanel.hidden = false;
    document.getElementById("update-status-message").textContent = error.message;
    if (showErrors) console.error("アップデートを確認できませんでした:", error);
  }
}

function openUpdateDialog(checkNow = false) {
  updateDialog.showModal();
  if (availableUpdate) {
    showUpdate(availableUpdate);
  } else {
    updateAvailablePanel.hidden = true;
    updateStatusPanel.hidden = false;
    document.getElementById("update-current-version").textContent =
      currentAppVersion === "確認中" ? "" : `現在のバージョン: ${currentAppVersion}`;
  }
  if (checkNow) void checkUpdates();
}

async function saveUpdateFeed() {
  if (!window.streammateUpdates) return;
  const input = document.getElementById("update-feed-url");
  try {
    await window.streammateUpdates.setFeed(input.value.trim());
    updateFeedUrl = input.value.trim();
    availableUpdate = null;
    document.getElementById("update-indicator").hidden = true;
    await checkUpdates();
    render();
  } catch (error) {
    document.getElementById("update-status-message").textContent = error.message;
    openUpdateDialog();
  }
}

async function loadAppConfiguration() {
  if (!window.streammateTwitch || !window.streammateUpdates) return;
  let legacyClientId = null;
  try {
    legacyClientId = localStorage.getItem("streammate-twitch-client-id");
    const clientConfig = await window.streammateTwitch.getClientIdStatus();
    if (!clientConfig.configured && legacyClientId) {
      await window.streammateTwitch.setClientId(legacyClientId);
      clientConfig.configured = true;
    }
    twitchClientIdConfigured = clientConfig.configured;
  } catch (error) {
    console.error("Twitch設定の読み込みに失敗しました:", error);
  } finally {
    try {
      if (legacyClientId) localStorage.removeItem("streammate-twitch-client-id");
    } catch (error) {
      console.error("以前のTwitch設定を削除できませんでした:", error);
    }
  }
  try {
    const updateConfig = await window.streammateUpdates.getConfig();
    updateFeedUrl = updateConfig.feedUrl || "";
    currentAppVersion = updateConfig.currentVersion;
    if (currentPage === "settings") render();
    if (updateConfig.configured) void checkUpdates(false);
  } catch (error) {
    console.error("アップデート設定の読み込みに失敗しました:", error);
  }
}

document.getElementById("update-notice-button").addEventListener("click", () => openUpdateDialog(true));
document.getElementById("update-dialog-close").addEventListener("click", () => updateDialog.close());
document.getElementById("update-check-button").addEventListener("click", () => checkUpdates());
document.getElementById("update-download-button").addEventListener("click", async () => {
  try {
    await window.streammateUpdates.openDownload();
  } catch (error) {
    document.getElementById("update-status-message").textContent = error.message;
  }
});

if (window.streammateUpdates) {
  window.streammateUpdates.onAvailable(showUpdate);
}

document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    document.getElementById("global-search").focus();
  }
});

render();
void loadAppConfiguration();
