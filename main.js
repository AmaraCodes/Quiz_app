'use strict'

const {app, BrowserWindow, ipcMain} = require('electron')
const url = require('url')
const Window = require('./window')
const path = require('path')


// require('electron-reload')(__dirname)

let win;

function createWindow() {
  win = new BrowserWindow({width: 800, height: 500,
     webPreferences: {
     nodeIntegration: true
 }})

  win.loadURL(url.format ({
     pathname: path.join(__dirname, 'index.html'),
     protocol: 'file:',
     slashes: true
  }))
}

let addQuizWin


ipcMain.on('add-quiz-window', () => {

  if (!addQuizWin) {
    
    addQuizWin = new Window({
      file: path.join(__dirname, 'landing.html'),
      width: 400,
      height: 400,
      parent: mainWindow
    })

  
    addQuizWin.on('closed', () => {
      addQuizWin = null
    })
  }
})

app.on('ready', createWindow)