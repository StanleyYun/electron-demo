const {
    ipcMain
} = require('electron');
function download(webContents) {
    ipcMain.on('download', (event, arg)=> {
        let downloadpath = 'http://zx.xjy0.cn/assets/smart/logo-63caa3d1c6bfe64755044e8a6face44a.png'
        webContents.downloadURL(downloadpath);
    });
    webContents.session.on('will-download', (event, item, webContents) => {
        //设置文件存放位置,这里的路径可通过render进程传入变量,灵活使用避免hardcode
        //item.setSavePath('/home/yt00785'+`\\${item.getFilename()}`);
        item.setSavePath('/home/yt00785/Downloads/' + item.getFilename());
        item.on('updated', (event, state) => {
            if (state === 'interrupted') {
                console.log('Download is interrupted but can be resumed')
            } else if (state === 'progressing') {
                if (item.isPaused()) {
                    console.log('Download is paused')
                } else {
                    console.log(`Received bytes: ${item.getReceivedBytes()}`)
                }
            }
        })
        item.once('done', (event, state) => {
            if (state === 'completed') {
                console.log('Download successfully')
            } else {
                console.log(`Download failed: ${state}`)
            }
        })
    });
}
module.exports = download;