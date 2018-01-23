const electron = require('electron')
const { desktopCapture, app, BrowserWindow, globalShortcut } = electron

let mainWindow

app.on('ready', _=> {
    mainWindow = new BrowserWindow({
        height: 400,
        width: 400,
        resizeable: false,
        frame: false
    })

    mainWindow.openDevTools()
    mainWindow.loadURL(`file://${__dirname}/capture.html`)

    mainWindow.on('close', _ => {
        mainWindow = null
    })

    globalShortcut.register('Ctrl+Alt+D', _ => {
        //console.log('Got shortcut!') // Works!
        mainWindow.webContents.send('capture')
    })
})