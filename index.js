// ENV
require('dotenv').config();

// REQUIRES
const express = require('express');
const flash = require('connect-flash');
const layouts = require('express-ejs-layouts');
const parser = require('body-parser');
const passport = require('./config/passportConfig');
const session = require('express-session');

// APP
const app = express();

// DATABASE
const db = require('./models');

// CONSTANTS
const PORT = 3000;

// SETTINGS
app.set('view engine', 'ejs');

// MIDDLEWARE
app.use(layouts);
app.use(express.static(__dirname + '/static'));
app.use(parser.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// CUSTOM MIDDLEWARE
app.use(function dataToLocals (req, res, next) {
  res.locals.alerts = req.flash();
  res.locals.user = req.user;
  next();
});

// ROUTES
app.get('/', (req, res) => {
  res.render('home');
});


// CONTROLLERS
app.use('/auth', require('./controllers/auth'));
app.use('/profile', require('./controllers/profile'));

// LISTEN
app.listen(PORT);
