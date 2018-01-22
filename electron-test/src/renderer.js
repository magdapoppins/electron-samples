const electron = require('electron')
const ipc = electron.ipcRenderer

document.getElementById('start').addEventListener('click', _=> {
    ipc.send('countdown-started')
})

ipc.on('countdown', (evt, count) => {
    document.getElementById('count').innerHTML = count
})