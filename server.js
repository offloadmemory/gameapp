var express  = require('express');
var config   = require("config");
var app      = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var bodyparser   = require ('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passportConfig = require('./app/passport');
var routes         = require('./app/routes');

// Use native Node promises
mongoose.Promise = global.Promise;

// connect to MongoDB
mongoose.connect(config.get("mongoLabUrl"), { useMongoClient: true })
.then(() => console.log('connection succesful'))
.catch((err) => console.error(err));

passportConfig(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set("port", config.get("port"));

app.use(session({
    secret : 'abcdefghijklmnopqwerty',
    resave : true,
    saveUninitialized : true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

routes(app,passport);

app.listen(app.get("port"), function () {
    console.log("I will always be there for u at port " + app.get("port"));
})