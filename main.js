const { app, BrowserWindow, screen, Tray, Menu } = require("electron");

var path = require("path");

// Open new window
function openWindow(name, url, maximized = false, square = false) {
  let win = null;

  // Icon main
  let iconFile = path.join(__dirname, "src/icons/" + name + ".png");

  // Window size
  let W = ( square ? 1024 : 450 );
  let H = ( square ? 768 : 800 );


  win = new BrowserWindow({
    width: 450,
    height: 800,
    frame: true,
    resizable: true,
    fullscreenable: true,
    selectable: false,
    background: false,
    transparent: true,
    movable: true,
    alwaysOnTop: false,
  });
  win.setMenu(null);
  win.setResizable(true);
  win.setIcon(iconFile);
  if (maximized) {
    win.maximize();
  }
  win.loadURL(url);
}

function mainWindow() {
  let win = null;
  // Icon main
  let iconFile = path.join(__dirname, "src/icons/main.png");

  // Screen width x height
  const { screeWidth, screeHeight } = screen.getPrimaryDisplay().workAreaSize;

  win = new BrowserWindow({
    width: screeWidth,
    height: screeHeight,
    frame: false,
    resizable: true,
    fullscreenable: false,
    selectable: false,
    background: false,
    transparent: true,
    movable: true,
    icon: iconFile,
    alwaysOnTop: false,
  });

  win.setIcon(iconFile);
  win.maximize();
  win.setFullScreen(true);
  win.setResizable(true);
  win.hide();
  //win.setContentProtection(true);
  win.setMenu(null);

  // Open main window
  win.loadFile("index.html");

  tray = new Tray(iconFile);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Instagram",
      click: () => {
        openWindow("instagram", "https://instagram.com", false);
      },
    },
    {
      label: "Linkedin",
      click: () => {
        openWindow("linkedin", "https://linkedin.com", false);
      },
    },
    {
      label: "Twitter",
      click: () => {
        openWindow("twitter", "https://twitter.com", false);
      },
    },    
    {
      label: "Facebook",
      click: () => {
        openWindow("facebook", "https://facebook.com", false);
      },
    },
    {
      label: "Youtube",
      click: () => {
        openWindow("youtube", "https://youtube.com", true);
      },
    },
    {
      label: "Discord",
      click: () => {
        openWindow("discord", "https://discord.com/channels/@me", false, true);
      },
    },
    {
      label: "Twitch",
      click: () => {
        openWindow("twitch", "https://www.twitch.tv", true, true);
      },
    },
    {
      label: "Fechar",
      click: () => {
        app.quit();
      },
    },
    /*
    {
      label: "Call function",
      click: () => {
        const text = 'asdasdasd'
        // #1
        win.webContents.send('call-foo', text)
        // #2
        win.webContents.executeJavaScript(`
          foo('${text}')
        `)
      }
    }
    */
  ]);
  tray.setContextMenu(contextMenu);
}

// Load - start ini
app.whenReady().then(mainWindow);