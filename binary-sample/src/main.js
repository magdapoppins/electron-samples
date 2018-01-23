const electron = require('electron')
const {app, BrowserWindow} = electron

let mainWindow

app.on('ready', _=> {
    mainWindow = new BrowserWindow({
        height: 500,
        width: 500
    })
    mainWindow.loadURL(`file://${__dirname}/status.html`)
    mainWindow.on('close', _=> {
        mainWindow = null
    })
})