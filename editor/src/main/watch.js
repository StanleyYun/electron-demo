const gaze = require("gaze");
const path = require("path");
const queryString = require('querystring');
const http = require('http');
const fs = require('fs');
gaze(["*.txt", "src/*.txt"], function (err, watcher) {
    //监听文件的变化
    let watched = this.watched();
    this.on("all", (event, filepath) => {
        console.log(event);
        uploadFile(filepath, event);
        console.log(filepath + " was changed");
    });
});
function uploadFile(localPath, event) {
    let file = '';
    if (event !== 'deleted') {
        let data = fs.readFileSync(localPath);
        file = data.toString('base64');
    }
    let filename = path.basename(localPath)

    let JsonData = queryString.stringify({
        event,
        filename,
        file
    });

    var options = {
        method: "POST",
        host: 'localhost',
        port: 8080,
        path: '/book/upload',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    var req = http.request(options, function (res) {
        res.setEncoding('utf8');
    });
    req.write(JsonData);
    req.end();
}
