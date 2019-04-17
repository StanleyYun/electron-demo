const {
    ipcRenderer,
    remote
} = require('electron');
const {
    Menu,
    MenuItem,
    dialog
} = remote;
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
let currentFile = null;
let isSaved = true;
let txtEditor = document.getElementById('txtEditor');
let logDom = document.getElementById('log');
let txtExtensions = ['.txt', '.js', '.html', '.md', '.css'];
let imgExtensions = ['.png', '.jpg', '.jpeg', '.bmp'];
let officeExtensions = ['.doc', '.docx', '.ppt', '.ppt', '.xls','.xlsx']
document.title = 'editor- Untitled';

const contextMenumTemplate = [{
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
        role: 'delete'
    },
    {
        type: 'separator'
    },
    {
        role: 'selectall'
    }
];

const contextMenu = Menu.buildFromTemplate(contextMenumTemplate);

txtEditor.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    contextMenu.popup(remote.getCurrentWindow());
});

txtEditor.oninput = (e) => {
    if (isSaved) document.title += " *";
    isSaved = false;
};

ipcRenderer.on('action', (event, arg) => {
    switch (arg) {
        case 'new':
            askSaveIFNeed();
            currentFile = null;
            textEditor.value = '';
            document.title = 'editor -Untitled';
            isSaved = true;
            break;
        case 'open':
            askSaveIFNeed();
            openFile();
            break;
        case 'save':
            saveCurrentDoc();
            break;
        case 'exiting':
            askSaveIFNeed();
            ipcRenderer.sendSync('reqaction', 'exit');
            break;
        case 'add':
            addFontSize();
            break;
        case 'reduce':
            reduceFontSize();
            break;
        case 'default':
            defaultFontSize();
            break;
    }
});

function openFile() {
    const files = remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
        filters: [{
                name: "Text Files",
                extensions: ['txt', 'js', 'html', 'md', 'css']
            },
            {
                name: 'All Files',
                extensions: ['*']
            }
        ],
        properties: ['openFile']
    });
    if (files) {
        currentFile = files[0];
        extname = path.extname(currentFile);
        if (txtExtensions.includes(extname)) {
            const txtRead = readText(currentFile);
            txtEditor.value = txtRead;
            document.title = 'editor -' + currentFile;
            isSaved = true;
        } else {
            let openFile = remote.dialog.showMessageBox(remote.getCurrentWindow(), {
                message: 'Do you want use Do you want to open it with the default programdefault document?',
                type: 'question',
                buttons: ['Yes', 'No']
            });
            if (openFile == 0) {
                if (imgExtensions.includes(extname)) {
                    exec(`eog ${currentFile}`, (error, stdout, stderr) => {
                        console.log(error);
                    });
                } else if (officeExtensions.includes(extname)) {
                    exec(`wps ${currentFile}`, (error, stdout, stderr) => {
                        console.log(error);
                    });
                }
            }
        }

    }
};

function readText(file) {
    return fs.readFileSync(file, 'utf-8');
};

function saveText() {
    fs.writeFileSync(file, text);
};

function saveCurrentDoc() {
    if (!currentFile) {
        const files = remote.dialog.showSaveDialog(remote.getCurrentWindow(), {
            filters: [{
                    name: "Text Files",
                    extensions: ['txt', 'js', 'html', 'md']
                },
                {
                    name: 'All Files',
                    extensions: ['*']
                }
            ],
            properties: ['openFile']
        });
    } else {
        const text = textEditor.value;
        saveText(currentFile, text);
        isSaved = true;
        document.title = 'editor -' + currentFile;
    }
};

function askSaveIFNeed() {
    if (isSaved) {
        return;
    }
    const message = remote.dialog.showMessageBox(remote.getCurrentWindow(), {
        message: 'Do you want save current document?',
        type: 'question',
        buttons: ['Yes', 'No']
    });
    if (message == 0) {
        saveCurrentDoc();
    }
};

if (localStorage.getItem('size')) {
    txtEditor.style.fontSize = localStorage.getItem('size');
}

function addFontSize() {
    let fontSize = window.getComputedStyle(txtEditor, null).fontSize;
    let size = fontSize.replace('px', '') - 0 + 3;
    let newSize = size + 'px';
    txtEditor.style.fontSize = newSize;
    localStorage.setItem('size', newSize);
}

function reduceFontSize() {
    let fontSize = window.getComputedStyle(txtEditor, null).fontSize;
    let size = fontSize.replace('px', '') - 0 - 3;
    let newSize = size + 'px';
    txtEditor.style.fontSize = newSize;
    localStorage.setItem('size', newSize);
}

function defaultFontSize() {
    txtEditor.style.fontSize = '18px';
    localStorage.setItem('size', '18px');
}

window.onload = function () {
    //ipcRenderer.send('update');
    //ipcRenderer.send('download' );
    //ipcRenderer.send('reqaction', 'exe');
}