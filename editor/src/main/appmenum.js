const {
    BrowserWindow,
    Menu,
    MenuItem,
    ipcMain
} = require("electron");
let checkForUpdates = require("./update");
let appMenumTemplate = [{
        label: 'File',
        submenu: [{
                label: "New",
                click(item, currentWindow) {
                    currentWindow.webContents.send("action", "new");
                },
                accelerator: "CmdOrCtrl+N"
            },
            {
                label: "Save",
                click(item, currentWindow) {
                    currentWindow.webContents.send("action", "save");
                },
                accelerator: "CmdOrCtrl+S"
            },
            {
                label: "Open",
                click(item, currentWindow) {
                    currentWindow.webContents.send("action", "open");
                },
                accelerator: "CmdOrCtrl+O"
            },
            {
                type: "separator"
            },
            {
                role: "quit"
            }
        ]
    },
    {
        label: 'Edit',
        submenu: [{
                role: 'undo'
            },
            {
                role: 'redo'
            },
            {
                type: 'separator'
            },
            {
                role: 'cut'
            },
            {
                role: 'copy'
            },
            {
                role: 'paste'
            },
            {
                role: 'pasteandmatchstyle'
            },
            {
                role: 'delete'
            },
            {
                role: 'selectall'
            }
        ]
    },
    {
        label: 'View',
        submenu: [{
                role: 'reload'
            },
            {
                role: 'forcereload'
            },
            {
                role: 'toggledevtools'
            },
            {
                type: 'separator'
            },
            {
                role: 'resetzoom'
            },
            {
                role: 'zoomin'
            },
            {
                role: 'zoomout'
            },
            {
                type: 'separator'
            },
            {
                role: 'togglefullscreen'
            }
        ]
    },
    {
        label: 'Format',
        submenu: [
            {
                label: 'Font color',
                accelerator: "F9",
                click(item, currentWindow) {
                    createColorWin();
                },
            },
            {
                type: 'separator'
            },
            {
                label: 'Font add',
                accelerator: "F11",
                click(item, currentWindow) {
                    currentWindow.webContents.send("action", "add");
                },
            },
            {
                label: 'Font reduce',
                accelerator: "F10",
                click(item, currentWindow) {
                    currentWindow.webContents.send("action", "reduce");
                },
            },
            {
                label: 'Restor Default',
                accelerator: "F10",
                click(item, currentWindow) {
                    currentWindow.webContents.send("action", "default");
                },
            }
        ]
    },
    {
        role: 'help',
        submenu: [{
                label: 'Check Version',
                click(item, currentWindow) {
                    checkForUpdates(currentWindow);
                }
            },
            {
                label: 'About',
                click() {

                }
            }
        ]
    }
];

function createColorWin() {
    let colorWin = new BrowserWindow(
        {
            width: 300,
            height: 200
        }
    );
}

const menu = Menu.buildFromTemplate(appMenumTemplate);

Menu.setApplicationMenu(menu);