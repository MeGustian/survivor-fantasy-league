// TODO: Remove unecessary packages from package.json (including all the other
// scripts).
var fs = require('fs');
var stylus = require('stylus');
var nib = require('nib');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

// Database
var mongo = require('mongodb');
var monk = require('monk');
var mongoose = require('mongoose');
var db = monk('survivoradmin:survivorpass@ds051853.mongolab.com:51853/survivor-fantasy-league');

var routes = require('./routes/index');

var app = express();

// ==============CONFIGURARTIONS=============================

mongoose.connect('survivoradmin:survivorpass@ds051853.mongolab.com:51853/survivor-fantasy-league');
require('./config/passport')(passport); // pass passport for configuration
//require('./routes/index.js')(passport);
app.use(favicon(__dirname + '/public/favicon.ico')); // Favicon

function compile(str, path) {
	return stylus(str)
		.set('filename', path)
		.use(nib())
		.import('nib');
}
// Set views with Jade. Read below to understand the __dirname thing.
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
// Using Stylus with nib.
app.use(stylus.middleware(
	{ src: __dirname + '/public'
		, compile: compile
	}
));

// Set `/public` as the static resources, which is accessible from the browser
// as if public was the root directory.
// Example: If I want to access `/public/images/logo.png`, I could write
// `__full-site-URL__/images/logo.png`.
app.use(express.static(__dirname + '/public'));
// TODO: Understand this.
app.use(bodyParser.json());
// TODO: Understand this.
app.use(bodyParser.urlencoded({extended: true}));
// TODO: Understand this.
// app.use(app.router);
app.use(cookieParser()); // read cookies (needed for auth)
// required for passport
app.use(session({ secret: 'thisisasecrettest' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Connect to DB
app.use(function(req,res,next){
	req.db = db;
	next();

});


app.use('/', routes);




// ==============END CONFIGURARTIONS=============================



// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		// res.render('error', {
		// 	message: err.message,
		// 	error: err
		// });
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


module.exports = app;
