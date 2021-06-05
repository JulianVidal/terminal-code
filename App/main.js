const electron = require('electron')
const url = require('url')
const path = require('path')

const {app, BrowserWindow, Menu, ipcMain, ipcRenderer} = electron

let mainWindow

let addWindow

let mainWindowhtml = 'mainWindow.html'

let addWindowhtml = 'addWindow.html'

let testItem

app.on('ready', createWindow)

function createWindow() {

  console.log('Window has been created')

  mainWindow = new BrowserWindow(
    {
      height: 400,
      width: 600
    }
  )

  mainWindow.loadURL(url.format(
    {
      pathname: path.join(__dirname, mainWindowhtml),
      protocol: 'file:',
      slashes: true

    }
  )
)

mainWindow.on('closed', () => {app.quit(); addWindow = 'null'})

if (process.platform == 'darwin') {
  mainMenuTemplate.unshift({label: '', role: 'TODO'})
}

const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)

Menu.setApplicationMenu(mainMenu)
}

app.on('before-quit', () => console.log('Window has been closed'))

function createAddWindow() {
  console.log('new Window')

  addWindow = new BrowserWindow(
    {
      height: 200,
      width: 300
    }
  )

  addWindow.loadURL(url.format(
    {
      pathname: path.join(__dirname, addWindowhtml),
      protocol: 'file',
      slashes: true
    }
  )
)
}

ipcMain.on('item:add', (event, item) => {mainWindow.webContents.send('item:add', item); addWindow.close()})
ipcMain.on('value:add', (event, value) => {mainWindow.webContents.send('value:add', value)})

const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Add Item',
        click() {
          createAddWindow()
        }
      },
      {
        label: 'Clear Item',
        click() {
          clearItem()
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit' ,
        accelerator: 'CmdOrCtrl+Q',
        click(){
          app.quit()
        }
      }
    ]
  }
]


if (process.env.NODE_ENV !== 'production') {
  mainMenuTemplate.push(
    {
      label: 'Developer Tool',
      submenu: [
        {
          label: 'Toogle DEV tool',
          accelerator: process.platform == 'darwin' ? 'Cmd+I' : 'Ctrl+I',
          click(item, focusedWindow) {
            focusedWindow.toggleDevTools();
          }
        },
        {
          role: 'reload'
        }
      ]
    }
  )
}
