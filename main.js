const {
  app,
  BrowserWindow,
  Menu,
  Tray,
  ipcMain,
  ipcRenderer,
} = require("electron");
var path = require("path");
let win = null;

function createWindow() {
  // Icon main
  let iconFile =
    process.platform !== "darwin"
      ? path.join(__dirname, "assets/icons/win/main.ico")
      : path.join(__dirname, "assets/icons/png/main.png");

  // Icon status
  let iconFileStatus =
    process.platform !== "darwin"
      ? path.join(__dirname, "assets/icons/win/128x128-on.ico")
      : path.join(__dirname, "assets/icons/mac/128x128-on.png");      

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

  win.setIcon(iconFile);
  win.setOverlayIcon(iconFileStatus, "Online");

  // Disable context menu for // TODO
  //win.removeMenu();

  // Tray
  let tray = new Tray(iconFile);
  const contextMenu = Menu.buildFromTemplate([
    { label: "Item1", type: "radio" },
    { label: "Item2", type: "radio" },
    { label: "Item3", type: "radio", checked: true }
  ]);
  tray.setToolTip("My Widget.");
  tray.setContextMenu(contextMenu);

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

  // Content protection
  win.setContentProtection(true);

  // Online Offline - monitor status
  ipcMain.on("online-status-changed", (event, online) => {
    // Check status
    if (online) {
      if (process.platform !== "darwin")
        iconFileStatus = path.join(__dirname, "assets/icons/win/128x128-on.ico");
      else iconFileStatus = path.join(__dirname, "assets/icons/mac/128x128-on.icns");
    } else {
      if (process.platform !== "darwin")
        iconFileStatus = path.join(__dirname, "assets/icons/win/128x128-off.ico");
      else iconFileStatus = path.join(__dirname, "assets/icons/mac/128x128-off.icns");
    }
    win.setOverlayIcon(iconFileStatus);
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
