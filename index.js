const express = require('express')
const path = require("path");
var app = express()
const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs');

app.use('/', express.static('./public/home/'));

app.use('/clock', express.static('./public/clock/'));

app.get('/hello', function(req, res) {
  res.send("Hello World!!!")
})


app.get('/time', function (req, res) {
  function getTime() {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    var text = "Current Time: ";
    return text += year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
  }

  res.send(getTime());
})

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`)
})