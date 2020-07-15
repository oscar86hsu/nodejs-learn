const http = require("http");
var url = require('url');

const hostname = "127.0.0.1";
const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    var text = "Hello World!\nCurrent Time: ";
    text += year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end(text);
});

server.listen(PORT);