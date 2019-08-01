'use strict'

const path = require('path');
const remote = require('electron').remote;
const BrowserWindow = remote.BrowserWindow;
const notifier = require('node-notifier')



  // const button = document.getElementById('playBtn');
  button.addEventListener('click', () => {
  createBrowserWindow();
  });

function createBrowserWindow() {
  const win = new BrowserWindow({
    height: 450,
    width: 600
  });

  win.loadURL(url.format ({
    pathname: path.join(__dirname, 'landing.html'),
    protocol: 'file:',
    slashes: true
 }))
}

document.getElementById('playBtn').onclick = () => {
  notifier.notify ({
      title: 'WELCOME TO QUICK QUIZ!!!',
      message: 'You are about to answer a set multiple-choice questions...GOODLUCK!!! ',
      icon: path.join('game1.png'),
      sound: true, 
      wait: false
  
  });

  notifier.on('click', function () {
      console.log("You clicked on the notification")
  });

  notifier.on('timeout', function () {
      console.log("Notification timed out!")
  });
}