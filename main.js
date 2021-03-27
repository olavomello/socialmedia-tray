const { app, BrowserWindow, screen, Tray, Menu  } = require("electron");

var path = require("path");

// Open new window
function openWindow( name, url ) {
  let win = null;

  // Icon main
  let iconFile =  path.join(__dirname, "src/icons/" + name + ".png");

  win = new BrowserWindow({
    width: 450,
    height: 800,
    frame: true,
    resizable: true,
    fullscreenable: false,
    selectable: false,
    background: false,
    transparent: true,
    movable: true,
    alwaysOnTop: false,
  });
  win.setMenu(null);
  win.setIcon(iconFile);  
  win.loadURL(url);
}

function mainWindow() {
  let win = null;
  // Icon main
  let iconFile =  path.join(__dirname, "src/icons/main.png");

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
  win.hide();
  //win.setContentProtection(true);
  win.setMenu(null);

  // Open main window
  win.loadFile("index.html"); 

  tray = new Tray(iconFile)
  const contextMenu = Menu.buildFromTemplate([
    {label: "Instagram", click: () => { openWindow("instagram","https://instagram.com") }},
    {label: "Twitter", click: () => { openWindow("twitter","https://twitter.com") }},
    {label: "Facebook", click: () => { openWindow("facebook","https://facebook.com") }},
    {label: "Youtube", click: () => { openWindow("youtube","https://youtube.com") }},
    {label: "Whatsapp", click: () => { openWindow("whatsapp","https://web.whatsapp.com") }},
    {label: "Fechar", click: () =>  { app.quit() }},
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
  ])
  tray.setContextMenu(contextMenu);

}

// Load - start ini
app.whenReady().then(mainWindow);

global.HelloWorld = function(name){
  return 'Hello World! said ' + name;
}