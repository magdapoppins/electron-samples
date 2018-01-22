const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain

const countdown = require('./countdown.js')

let mainWindow

app.on('ready', _ => {
    console.log("Starting!")
    mainWindow = new BrowserWindow({
        height: 400,
        width: 400
    })

    mainWindow.loadURL(`file://${__dirname}/countdown.html`)

    //countdown()

    mainWindow.on('closed', _ => {
        console.log("Window closed.")
        mainWindow = null
    })
})

ipc.on('countdown-started', _=> {
    console.log("caught IPC!")
    countdown(count => {
        mainWindow.webContents.send('countdown', count)
    })
})