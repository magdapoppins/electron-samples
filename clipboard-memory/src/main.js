const electron = require('electron')
const {app, Tray, Menu, clipboard, globalShortcut} = electron

const path = require('path')
const STACK_SIZE = 5
const ITEM_MAX_LENGTH = 20

function checkClipboard(clipboard, onChange){

    let cache = clipboard.readText()
    //console.log(clipboard.readText()) // works

    let latest 

    setInterval(_ => {
        latest = clipboard.readText()
        if (latest !== cache){
            cache = latest
            onChange(cache)
        }
    }, 1000)
}

function addToStack(item, stack){
    return [item].concat(stack.length >= STACK_SIZE ? stack.slice(0, stack.length - 1) : stack)
}

function formatItem(item) {
    return item && item.length > ITEM_MAX_LENGTH
    ? item.substr(0, ITEM_MAX_LENGTH + "...")
    : item
}

function formatMenuTemplateForStack(stack) {
    return stack.map((item, i) => {
        return {
            label: `Copy: ${formatItem(item)}`,
            click: _ => clipboard.writeText(item),
            accelerator: `Ctrl+Alt+{i + 1}`
        }
    })
}

function registerShortcuts(globalShortcut, clipboard, stack) {
    globalShortcut.unregisterAll()
    for (let i = 0; i < STACK_SIZE; ++i) {
        globalShortcut.register(`Ctrl+Alt+${i + 1}`, _=> {
            clipboard.writeText(stack[i])
        })
    }
}

app.on('ready', _=> {
    let stack = []
    const tray = new Tray(path.join('src', 'lamp.png'))
    const myMenu = [
        {
            label: '<Empty>',
            enabled: false
        }
    ]    

    tray.setContextMenu(Menu.buildFromTemplate(myMenu))
    
    checkClipboard(clipboard, text => {
        stack = addToStack(text, stack)
        //console.log("stack: ", stack) // wprks
        tray.setContextMenu(Menu.buildFromTemplate(formatMenuTemplateForStack(stack)))
        registerShortcuts(globalShortcut, clipboard, stack)
    })
})