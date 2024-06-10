const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path');

function createWindow () {
  let win = new BrowserWindow({
    width: 1200,
    height: 1000,
    icon: `${__dirname}/../assets/icons/icon.png`,
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