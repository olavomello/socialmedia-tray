const { app, BrowserWindow, ipcMain, ipcRenderer } = require("electron");
var path = require("path");
let win = null;

function createWindow() {
  // Icon
  const iconFile =
    process.platform !== "darwin"
      ? path.join(__dirname, "assets/icons/win/128x128-off.ico")
      : path.join(__dirname, "assets/icons/mac/128x128-off.icns");

  win = new BrowserWindow({
    width: 300,
    height: 300,
    frame: false,
    resizable: false,
    fullscreenable: false,
    selectable: false,
    background: false,
    transparent: true,
    movable: true,
    icon: iconFile,
  });

  //
  /* Online - Offline */
  const updateOnlineStatus = () => {
    ipcRenderer.send(
      "online-status-changed",
      navigator.onLine ? "online" : "offline"
    );
  };

  // Open window
  win.loadFile("index.html");

  app.setUserTasks([
    {
      program: process.execPath,
      arguments: "--new-window",
      iconPath: process.execPath,
      iconIndex: 0,
      title: "Widget",
      description: "Real time monitor",
    },
  ]);

  // Online Offline - monitor status
  ipcMain.on("online-status-changed", (event, online) => {
    //
    if (online)
      win.icon = path.join(__dirname, "assets/icons/png/128x128-on.png");
    else win.icon = path.join(__dirname, "assets/icons/png/128x128-off.png");
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
