const { app, BrowserWindow } = require('electron')
function createWindow () {
  let win = new BrowserWindow({
    width: 1200,
    height: 1000,
    webPreferences: {
      nodeIntegration: true, // turn off nodeIntegration
      contextIsolation: false, // turn on contextIsolationt
    }
  })

  win.loadFile('calendar/index.html')
}

app.whenReady().then(createWindow)