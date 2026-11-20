const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("streammateTwitch", {
  getSession: () => ipcRenderer.invoke("twitch:get-session"),
  getClientIdStatus: () => ipcRenderer.invoke("twitch:get-client-id-status"),
  setClientId: (clientId) => ipcRenderer.invoke("twitch:set-client-id", clientId),
  startLogin: () => ipcRenderer.invoke("twitch:start-login"),
  cancelLogin: () => ipcRenderer.send("twitch:cancel-login"),
  getAnalytics: () => ipcRenderer.invoke("twitch:get-analytics"),
  logout: () => ipcRenderer.invoke("twitch:logout"),
  onStatus: (listener) => {
    const handler = (_event, status) => listener(status);
    ipcRenderer.on("twitch:status", handler);
    return () => ipcRenderer.removeListener("twitch:status", handler);
  }
});

contextBridge.exposeInMainWorld("streammateUpdates", {
  getConfig: () => ipcRenderer.invoke("updates:get-config"),
  setFeed: (url) => ipcRenderer.invoke("updates:set-feed", url),
  check: () => ipcRenderer.invoke("updates:check"),
  openDownload: () => ipcRenderer.invoke("updates:open-download"),
  onAvailable: (listener) => {
    const handler = (_event, update) => listener(update);
    ipcRenderer.on("updates:available", handler);
    return () => ipcRenderer.removeListener("updates:available", handler);
  }
});

contextBridge.exposeInMainWorld("streammateLibrary", {
  download: (resourceId) => ipcRenderer.invoke("library:download", resourceId),
  openBooth: (productId) => ipcRenderer.invoke("library:open-booth", productId)
});
