var express = require('express')
var app = express()
const PORT = process.env.PORT || 5000;

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/time', function (req, res) {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    var text = "Current Time: ";
    text += year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    res.send(text);
})

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`)
})