'use strict'

import { app, protocol, Menu, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import Store from 'electron-store'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  const store = new Store();
  // Create the browser window.
  const win = new BrowserWindow({
    x: store.get("window.x"),
    y: store.get("window.y"),
    width: store.get("window.width", 800),
    height: store.get("window.height", 600),
    webPreferences: {
      enableRemoteModule: true,
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })
  const templateMenu = [
    {
      label: 'Edit',
      submenu: [
        {
          role: 'undo',
        },
        {
          role: 'redo',
        },
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click(item, focusedWindow) {
            if (focusedWindow) focusedWindow.reload()
          },
        },
        {
          role: 'togglefullscreen',
        }, {
          label: 'page back',
          accelerator: 'CmdOrCtrl+Shift+Z',
          click(item, focusedWindow) {
            if (focusedWindow) focusedWindow.webContents.goBack()
          }
        },
      ]
    }, {
      label: 'About',
      submenu: [
        { role: 'about', label: `${app.name}について` }, { role: 'viewMenu' }
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(templateMenu);
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode

    Menu.setApplicationMenu(menu);
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development

    Menu.setApplicationMenu(menu);
    win.loadURL('app://./index.html')
  }
  win.on("close", () => {
    const store = new Store();
    store.set("window.x", win.getPosition()[0]);
    store.set("window.y", win.getPosition()[1]);
    store.set("window.height", win.getSize()[1]);
    store.set("window.width", win.getSize()[0]);
  });
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
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
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
