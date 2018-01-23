const fs = require('fs')
const exec = require('child_process').exec 
// The Node child_process-module allows the program to break out of breaking out of this node process and executing a different program in the host OS
const os = require('os')

function isDir(dir){
    try {
        return fs.lstatSync(dir).isDirectory() // look for the stats of that particular directory
    }
    catch (e) {
        return false
    }
}

function checkGitStatus(dir){
    exec('git status', {
        cwd: dir
    }, (err, stdout, stderr) => { 
        console.log("err", err)
        console.log("stdout", stdout)
        console.log("stderr", stderr)
    })
}

function formatDir(dir) {
    return /^~/.test(dir)
    ? os.homedir() + dir.substr(1).trim()
    : dir.trim()
}

let timer

document.getElementById('input').addEventListener('keyup', evt => {

    clearTimeout(timer)
    timer = setTimeout(_=> {
        console.log('Logging less...', evt.target.value)
        const dir = formatDir(evt.target.value) // Input value
        if(isDir(dir))
            checkGitStatus(dir)
    }, 500)
    //console.log('Typing', evt.target.value)
})