const electron = require('electron')

const {Tray, app, Menu} = electron
const path = require('path')

app.on('ready', _=> {
    const tray = new Tray(path.join('src', 'lamp.png'))
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'One',
            click: _=> console.log("Menu up!")
        }, {
            label: 'Two',
            click: _=> console.log("Menu up!")
        }
    ])
    tray.setContextMenu(contextMenu)
    tray.setToolTip('Open the fabulous app!')
})