require('dotenv').config()
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require("path");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const passport = require('passport');
const connectEnsureLogin = require('connect-ensure-login');
const passportLocalMongoose = require('passport-local-mongoose');
const LocalStrategy = require('passport-local').Strategy
const Schema = mongoose.Schema;

// Variables
const PORT = process.env.PORT || 5000;
const USERNAME = process.env.USERNAME || "user";
const PASSWORD = process.env.PASSWORD || "1234";
const COOKIESECRET = crypto.randomBytes(20).toString('hex');

// Express framework
var app = express();

// View engine setup
app.set('view engine', 'ejs');

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());
app.use(cookieParser(COOKIESECRET));
app.use(session({
  cookie: { maxAge: 60000 },
  saveUninitialized: true,
  resave: 'true',
  secret: COOKIESECRET
}));

// Passport setup
var Account = require('./models/account');
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
Account.register({username:USERNAME, active: false}, PASSWORD).then(() => {
  console.log("User Registered");
}).catch((err) => {
  console.log("User Already Registered");
});;;

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("Connected to Database");
}).catch((err) => {
  console.log("Not Connected to Database ERROR! \n", err);
});;

// Serve static page
app.use(express.static(path.join(__dirname, 'public')));

// Routes
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
  res.render('login.ejs', { message: req.flash('error') })
})

app.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/');
})


app.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), (req, res, next) => {
  req.session.save((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/dashboard');
  });
});

app.get('/dashboard', connectEnsureLogin.ensureLoggedIn(), function (req, res) {
  res.render('dashboard', {username: req.user.username});
})

// 404 Not found
app.get('*', function(req, res){
  res.status(404).redirect('/404.html');
});

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`)
})