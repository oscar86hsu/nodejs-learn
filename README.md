# NodeJS Note
Demo Site: [https://app.oscarhsu.me](https://app.oscarhsu.me)<br>
Default username: user<br>
Default password: 1234<br>
## Express Basic
`const express = require('express');`<br>
`var app = express();`<br>
`app.get('/hello', function (req, res) {res.send("Hello World!!!")})`
<br>

### Hello
    Return `Hello World!!!`.

### Time String
    Return Current Time as String

## Express Static HTML
`app.use('/', express.static('./public/home/'));`<br>
`app.use('/clock', express.static('./public/clock/'));`<br>

### Home Page
    Home Page with links to different path.

### Clock
    Digital Clock using Javascript.

## View Engine (EJS)
`const flash = require('connect-flash');`<br>
`app.set('view engine', 'ejs');`<br>
``app.get('/login', function (req, res) {
  res.render('login.ejs', { message: req.flash('error') })
})``<br>

### Login
    Simple login page using view engine to render.
    Shows login failed message when login failed.

### Dashboard
    Dashboard after logged in.

## Express Session
`const session = require('express-session');`<br>
``res.locals.username = username;
    req.session.username = res.locals.username;
    console.log(req.session.username);
    res.render('dashboard.ejs', {username: username};``<br>
### Dashboard
    Show Hello `username` in page.

## To do list
- [ ] Calculator
- [ ] URL Shortener
- [ ] Chat App
- [ ] Weather Dashboard
- [ ] Ads
