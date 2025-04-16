const { app, ipcMain, BrowserWindow, protocol } = require("electron")
const path = require("path")

let mainWindow

//プロトコルを設定
app.on('ready', () => {
    protocol.registerFileProtocol('dice', (request, callback) =>
        callback(decodeURI(request.url.toString().replace(/^dice:\//, '')))
    )
})
protocol.registerSchemesAsPrivileged([
    {
        scheme: 'dice',
        privileges: {
            secure: true,
            corsEnabled: true
        }
    }
])
//メインウィンドウを作成
const wcMain = () => {
    mainWindow = new BrowserWindow({
        height: 1080,
        width: 1920,
        fullscreen: true,
        webPreferences: {
            preload: path.join(__dirname, "./src/js/preload.js")
        }
    })
    mainWindow.loadFile(path.join(__dirname, "./src/html/index.html"))
};


app.on('quit', () => {
    mainWindow.destroy();
})

app.on('ready', () => {
    wcMain()
})