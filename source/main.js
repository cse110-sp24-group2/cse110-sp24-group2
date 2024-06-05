const { app, BrowserWindow, ipcMain, dialog } = require('electron')

function createWindow () {
  let win = new BrowserWindow({
    width: 1200,
    height: 1000,
    webPreferences: {
      nodeIntegration: true, // turn off nodeIntegration
      contextIsolation: false, // turn on contextIsolationt
    }
  })

  win.loadFile('source/calendar/index.html')
}

app.whenReady().then(createWindow)

ipcMain.on('show-error-dialog', (event, title, message) => {
  dialog.showErrorBox(title, message);
  event.returnValue = null;
});