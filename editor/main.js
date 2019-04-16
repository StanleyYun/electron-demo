const {
    app,
    BrowserWindow,
    ipcMain
} = require("electron");
require("./src/main/appmenum.js");
let exec = require('child_process').exec
let checkForUpdates = require("./src/main/update.js");
let download = require("./src/main/download");
let argv = process.argv;
// 保持对window对象的全局引用，如果不这么做的话，当JavaScript对象被
// 垃圾回收的时候，window对象将会自动的关闭
let win, webContents;
let safeExit = false;

function createWindow() {
    // 创建浏览器窗口。
    win = new BrowserWindow({
        width: 800,
        height: 600
    });
    webContents = win.webContents;
    // 然后加载应用的 index.html。
    win.loadURL(`file://${__dirname}/src/render/index.html`);

    // 打开开发者工具
    if (argv.includes('dev')) {
        win.webContents.openDevTools()
    }

    win.on("close", e => {
        if (!safeExit) {
            e.preventDefault();
            win.webContents.send("action", "exiting");
        }
    });
    // 当 window 被关闭，这个事件会被触发。
    win.on("closed", () => {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 与此同时，你应该删除相应的元素。
        win = null;
    });
    download(webContents);
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on("ready", createWindow);

// 当全部窗口关闭时退出。
app.on("window-all-closed", () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (win === null) {
        createWindow();
    }
});

ipcMain.on("reqaction", (event, arg) => {
    switch (arg) {
        case "exit":
            safeExit = true;
            app.quit();
            break;
        case "exe":
               exec("npm start",{cwd:"/home/yt00785/nodeproject/watchFile"}, (err, stdout, stderr)=>{
                    console.log(err);
                    console.log("------------------");
                    console.log(stdout);
                    console.log("------------------");
                    console.log(stderr);
               });
            break
    }
});

ipcMain.on('update', (e, arg) => {
    if (!argv.includes('dev')) {
        checkForUpdates(win);
    }
});

require("./src/main/watch");
require("./src/main/receives");