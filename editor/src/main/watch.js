const gaze = require("gaze");
const path = require("path");
const queryString = require('querystring');
const http = require('http');
const fs = require('fs');
gaze(["*.txt", "src/*.txt"], function (err, watcher) {
    //监听文件的变化
    let watched = this.watched();
    this.on("renamed", (oldPath, newPath) => {
        console.log(oldPath);
        console.log(newPath + " was changed");
        uploadFile("renamed", oldPath, newPath);
    });

    this.on("changed", (filePath) => {
        console.log(filePath + " was changed");
        uploadFile("changed", filePath);
    });

    this.on("added", (filePath) => {
        console.log(filePath + " was changed");
        uploadFile("added", filePath);
    })

    // this.on("deleted", (oldPath, newPath) => {

    // });
});

function uploadFile(event, ...filepath) {
    let file = '';
    let filename = '';
    let oldname = '';
    if (event == 'renamed' && filepath.length > 1) {
        oldname = path.basename(filepath[0]);
        filename = path.basename(filepath[1]);
    } else {
        file = fs.readFileSync(filepath[0]).toString('base64');
        filename = path.basename(filepath[0]);
    }

    let JsonData = queryString.stringify({
        event,
        filename,
        oldname,
        file
    });

    let options = {
        method: "POST",
        host: 'localhost',
        port: 8080,
        path: '/book/upload',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    let req = http.request(options, function (res) {
        res.setEncoding('utf8');
        console.log(res.statusCode);
        let errorMessage;
        if (res.statusCode == 500){
            errorMessage = "服务器故障!!!!";
        } else {
            res.on('data', (chunk) => {
                console.log(`响应主体: ${chunk}`);
            });
            res.on('end', () => {
                console.log('响应中已无数据。');
            });
        }
        
       
    });

    req.on('error', (e) => {
        console.error(`请求遇到问题: ${e.message}`);
    });

    req.write(JsonData);
    req.end();
}