const path = require('path')
const { app, BrowserWindow, TouchBar } = require('electron')
const { TouchBarButton } = TouchBar


const spin = new TouchBarButton({
  label: '👻 血小板 けっしょうばん',
  backgroundColor: '#7851A9',
  click: () => {
    console.log('血小板')
  }
})

const touchBar = new TouchBar([spin])

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 320,
    height: 350,
    title: 'platelet',
    hasShadow: false,
    transparent: true,
    titleBarStyle: 'customButtonsOnHover',
    resizable: app.isPackaged ? false : true,
    frame: false,
    focusable: true,
    alwaysOnTop: true,
    show: false,
    webPreferences: {
      // preload: path.join(app.getAppPath(), 'assets/js/renderer.js')
      nodeIntegration: true,
      nodeIntegrationInWorker: true
    }
  })

  mainWindow.loadFile('index.html')

  mainWindow.on('closed', () => mainWindow = null)

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    mainWindow.setTouchBar(touchBar)
  })
}

app.on('ready', () => createWindow())

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

app.requestSingleInstanceLock()

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
  }
})

if (process.platform === "darwin") {
  app.setAboutPanelOptions({
    applicationName: "血小板",
    applicationVersion: app.getVersion(),
    copyright: "Copyright 2018",
    credits: "Amor"
  });
}
