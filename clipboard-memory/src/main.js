const electron = require('electron')
const {app, Tray, Menu, clipboard, globalShortcut} = electron
const path = require('path')

// We set constants to determine the sizes of the stack of copyables in the tray and a max length to each tray item
const STACK_SIZE = 5
const ITEM_MAX_LENGTH = 20

// Combining different Electron API's allows us to create more powerful features.
// This app combines the clipboard API with the Tray and Menu APIs to create an extention to the clipboards functionality


// Check the clipboars for possible changes with an interval of one second
function checkClipboard(clipboard, onChange){

    let cache = clipboard.readText()
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
    // Note to self: as in let result = (condition) ? (value1) : (value2), 
    // If (condition), do (value1), else do (value2)
    // If stack length is bigger than the stack size definition, add item to stack -1, else add item to stack 
}

// Formatting the tray items
function formatItem(item) {
    return item && item.length > ITEM_MAX_LENGTH
    ? item.substr(0, ITEM_MAX_LENGTH + "...")
    : item
}

// Tray menu item template
function formatMenuTemplateForStack(stack) {
    return stack.map((item, i) => {
        return {
            label: `Copy: ${formatItem(item)}`,
            click: _ => clipboard.writeText(item),
            accelerator: `Ctrl+Alt+{i + 1}`
        }
    })
}

// Keyboard shortcuts for selecting items from the tray
function registerShortcuts(globalShortcut, clipboard, stack) {
    globalShortcut.unregisterAll()
    for (let i = 0; i < STACK_SIZE; ++i) {
        globalShortcut.register(`Ctrl+Alt+${i + 1}`, _=> {
            clipboard.writeText(stack[i])
        })
    }
}

// App lifecycle -->

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

app.on('will-quit', _=> {
    globalShortcut.unregisterAll()
})