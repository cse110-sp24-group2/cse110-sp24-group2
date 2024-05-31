const { app, BrowserWindow } = require('electron')
function createWindow () {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // turn off nodeIntegration
      contextIsolation: false, // turn on contextIsolationt
    }
  })

  win.loadFile('source/calendar/index.html')
}

app.whenReady().then(createWindow)