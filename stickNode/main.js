const {app, BrowserWindow} = require('electron');


function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile("index.html");
  win.webContents.openDevTools()
}

app.on('ready', createWindow);
