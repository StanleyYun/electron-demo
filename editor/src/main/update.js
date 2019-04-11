const {
    autoUpdater
} = require('electron-updater');
const {
    ipcMain
} = require('electron');
const feedUrl = "http://127.0.0.1:8080/assets";
let subwebContetns;
let checkForUpdates = (win) => {
    subwebContetns = win.webContents;
    // 配置安装包远端服务器
    autoUpdater.setFeedURL(feedUrl);

    // 下面是自动更新的整个生命周期所发生的事件
    autoUpdater.on('error', function (message) {
        sendUpdateMessage('error', message);
    });
    autoUpdater.on('checking-for-update', function (message) {
        sendUpdateMessage('checking-for-update', message);
    });
    autoUpdater.on('update-available', function (message) {
        sendUpdateMessage('update-available', message);
    });
    autoUpdater.on('update-not-available', function (message) {
        sendUpdateMessage('update-not-available', message);
    });

    // 更新下载进度事件
    autoUpdater.on('download-progress', function (progressObj) {
        sendUpdateMessage('downloadProgress', progressObj);
    });
    // 更新下载完成事件
    autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
        sendUpdateMessage('isUpdateNow');
        ipcMain.on('updateNow', (e, arg) => {
            autoUpdater.quitAndInstall();
        });
    });

    //执行自动更新检查
    autoUpdater.checkForUpdates();
};

// 主进程主动发送消息给渲染进程函数
function sendUpdateMessage(message, data) {
    subwebContetns.send('message', message);
}

module.exports = checkForUpdates;