const electron = require('electron')
const {ipcRenderer: ipc, desktopCapturer } = electron

function getMainSource(desktopCapturer, screen, done) {

}

function onCapture(){
    console.log("Capture!")
}

ipc.on('capture', onCapture)