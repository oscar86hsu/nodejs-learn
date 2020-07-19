require('dotenv').config()
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const path = require("path");
const bcrypt = require("bcrypt");

const PORT = process.env.PORT || 5000;
const USERNAME = process.env.USERNAME || "user";
const PASSWORD = process.env.PASSWORD || bcrypt.hashSync("1234", 10);;

var sessionStore = new session.MemoryStore;
var app = express();

app.use(cookieParser('b0w4FYvFklV0CldeSkWx'));
app.use(session({
  cookie: { maxAge: 60000 }, store: sessionStore,
  saveUninitialized: true,
  resave: 'true',
  secret: 'b0w4FYvFklV0CldeSkWx'
}));
app.use(flash());

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

app.use('/', express.static('./public/home/'));

app.use('/clock', express.static('./public/clock/'));

app.get('/hello', function (req, res) {
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
    return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
  }

  res.send(getTime());
})

app.get('/login', function (req, res) {
  res.render('login.ejs')
})

app.post('/login', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  if (username === USERNAME && bcrypt.compareSync(password, PASSWORD)) {
    res.redirect('/dashboard')
  }
  else {
    console.log('Login Failed!');
    req.flash('error', 'Login Failed!');
    res.locals.message = req.flash();
    res.render('login')
  }
})

app.get('/dashboard', function (req, res) {
  res.render('dashboard.ejs')
})

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`)
})