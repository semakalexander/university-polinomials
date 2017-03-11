const electron = require('electron');
const app = electron.app;
const path = require('path');
const url = require('url');

const BrowserWindow = electron.BrowserWindow;
let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width:896,
        height:522
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes:true
    }));
});