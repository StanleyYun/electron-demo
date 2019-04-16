//const images =  require("images");
const fs = require("fs");
const queryString = require('querystring');
let number;
let scaleVal;
let buttonDom = document.getElementById("scale");
let numberDom = document.getElementById("number");
let scaleValueDom = document.getElementById("scaleValue");
let video = document.getElementById('video'),
    canvas = document.getElementById('canvas'),
    img2 = document.getElementById('img2'),
    vendorUrl = window.URL || window.webkitURL;
if (localStorage.getItem('number')) {
    number = localStorage.getItem('number');
} else {
    number = 0;
}

function scale(a, cb) {
    scaleVal = randomNum();
    number = number + 1;
    localStorage.setItem('number', number);
    scaleValueDom.innerText = scaleVal;
    numberDom.innerText = number;
    console.log(a);
    tackPicure();
    process.nextTick(cb);
    console.log(a);
}

function upload(a, b) {
    console.log(a);
    console.log(b);
}

function randomNum() {
    return (Math.random() * (200 - 100 + 1) + 100).toFixed(2);
}

function watchCOM() {
    var SerialPort = require("serialport").SerialPort; //引入模块
    var portName = 'COM3'; //定义串口名
    var serialPort = new SerialPort(
        "COM3", {
            baudRate: 9600, //波特率
            dataBits: 8, //数据位
            parity: 'none', //奇偶校验
            stopBits: 1, //停止位
            flowControl: false
        }, false);

    serialPort.open(function (error) {
        if (error) {
            console.log("打开端口" + portName + "错误：" + error);
        } else {
            console.log("打开端口成功，正在监听数据中");
            serialPort.on('data', function (data) {
                console.log(data);
            })
        }
    });
}

buttonDom.addEventListener('click', () => {
    scale("start", function () {
        upload(scaleVal, number);
    });
    //image();
});

function tackPicure() {
    canvas.getContext('2d').drawImage(video, 0, 0, 400, 300);

    //把canvas图像转为img图片
    var data = canvas.toDataURL("image/png");
    saveImg(data, 'max');
    compressPicture(video);
}


//媒体对象
navigator.getMedia = navigator.getUserMedia ||
    navagator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;
navigator.getMedia({
    video: true, //使用摄像头对象
    audio: false //不适用音频
}, function (strem) {
    console.log(strem);
    video.src = vendorUrl.createObjectURL(strem);
    console.log(video);
    video.autoplay = true;
}, function (error) {
    //error.code
    console.log(error);
});

function compressPicture(blob) {
    var quality = 100;
    // 生成canvas画板
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 300;
    ctx.drawImage(blob, 0, 0, 400, 300);
    // 生成base64,兼容修复移动设备需要引入mobileBUGFix.js
    var imgurl = canvas.toDataURL('image/png', quality);
    img2.src = imgurl;
    saveImg(imgurl, 'min');
}

function saveImg(data, fileName) {
    var base64Data = data.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = Buffer.from(base64Data, 'base64');
    fs.writeFile(`./${fileName}.png`, dataBuffer, function (err) {
        console.log(err);
    });
    //upload(base64Data);
}

function upload(file) {
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

function image() {
    images('./a.jpg').resize(50).save('./b.jpg', {
        quality: 50
    });
}