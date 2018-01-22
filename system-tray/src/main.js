const electron = require('electron')

const {Tray, app, Menu} = electron
const path = require('path')

app.on('ready', _=> {
    const tray = new Tray(path.join('src', 'Findus.jpg'))
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Label',
            click: _=> console.log("Menu up!")
        }
    ])
    tray.setContextMenu(contextMenu)
})