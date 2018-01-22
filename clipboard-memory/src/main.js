const electron = require('electron')
const {app, Tray, Menu} = electron

const path = require('path')

app.on('ready', _=> {
    const tray = new Tray(path.join('src', 'some.png'))

    const myMenu = [
        {
            label: 'One',
            click: _=> app.quit()
        }]
    tray.setContextMenu(Menu.buildFromTemplate(myMenu))
})