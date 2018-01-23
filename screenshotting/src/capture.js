const electron = require('electron')
const {ipcRenderer: ipc, desktopCapturer, screen } = electron
const path = require('path')
const fs = require('fs')

function getMainSource(desktopCapturer, screen, done) {
    const options = {types: ['screen'], thumbnailSize: screen.getPrimaryDisplay().workAreaSize}
    // The desktopcapturer is able to take in all kinds of different sources, but now we only want screen
    desktopCapturer.getSources(options, (err, sources) => {
        if (err) return console.log('Cannot capture screen:', err)

        const isMainSource = source => source.name == 'Entire screen' || source.name == 'Screen 1'
        done(sources.filter(isMainSource)[0])
    })
}

function onCapture(evt, targetPath){
    getMainSource(desktopCapturer, screen, source => {
        const myScreenPng = source.thumbnail.toPng()
        const filePath = path.join(targetPath, new Date() + '.png')
        writeScreenshot(myScreenPng, filePath)
    })
}

function writeScreenshot(png, filePath) {
    fs.writeFile(filePath, png, err => {
        if (err) return console.log("Failed to write screen:", err)
    })
}

ipc.on('capture', onCapture)