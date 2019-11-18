'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
import request from "request";
require('dotenv').config()
let cookie = '';
const isDevelopment = process.env.NODE_ENV !== 'production'


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    frame: false,
    width: 1150, height: 700, webPreferences: {
      nodeIntegration: true
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installVueDevtools()
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }

  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

ipcMain.on('closeWindow', () => {
  let SYNC_URL = process.env.SYNC_URL || `http://localhost:8384/`
  request.get({ url: SYNC_URL }, function (err, res, body) {
    if (err) {
      win.webContents.send('close');
      return;
    } else {
      let response = res.headers;
      if (response['set-cookie']) {
        cookie = response['set-cookie'][0];
      }
      let csrf_token_header = cookie.split('=')[0];
      let csrf_token = cookie.split('=')[1];
      let headers = {
        'Cookie': cookie,
      }
      headers['X-' + csrf_token_header] = csrf_token;
      request.post({ url: `${SYNC_URL}rest/system/shutdown`, headers: headers }, function (err, res, body) {
        if (err) console.log(err)
        win.webContents.send('close');
      })
    }
  })
})
ipcMain.on('getDeviceId', (event,arg) => {
  console.log("====",arg)
  let SYNC_URL = arg
  // fRt4c73DxM76fs  
  // hirisov@gmail.com
  request.get({ url: SYNC_URL }, function (err, res, body) {
    if (err) console.log('err', err)
    let response = res.headers;
    if (response['set-cookie']) {
      cookie = response['set-cookie'][0];
    }
    let csrf_token_header = cookie.split('=')[0];
    let csrf_token = cookie.split('=')[1];
    let headers = {
      'Cookie': cookie,
    }
    headers['X-' + csrf_token_header] = csrf_token;

    request.get({ url: `${SYNC_URL}rest/system/config`, headers: headers }, function (err, res, body) {
      if (err) console.log(err)
      let deviceID = JSON.parse(body).devices[0].deviceID;
      win.webContents.send('deviceId', deviceID);
    })
  })
})
