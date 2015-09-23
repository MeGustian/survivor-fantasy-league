// TODO: Remove unecessary packages from package.json (including all the other
// scripts).
var fs = require('fs'),
	path = require('path'),
	express = require('express'),
	stylus = require('stylus'),
	nib = require('nib'),
	bodyParser = require('body-parser');
// A lot of express in the server side. I cannot even tell which functions are
// part of express and which are just vanilla node.
var app = module.exports = express();

// The name of the dummy JSON file.
// var jsonFileName = 'possibles';

// TODO: Understand this. Also see app.listen below.
app.set('port', (process.env.PORT || 3000));

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

// Set `/public` as the static resources, which is accessable from the browser
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

// TODO: Handle errors in the HTTP requests.
// Performs a GET HTTP request, and (I think) calls the function when done.
// This one renders `/views/home.jade` with sayHelloTo ready to intepolate.
app.get('/', function(req, res){
	res.render('home', {sayHelloTo: 'world'});
});
// TODO: Understand this.
// app.get('/' + jsonFileName + '.json', function(req, res) {
//	 fs.readFile(jsonFileName + '.json', function(err, data) {
//		 res.setHeader('Cache-Control', 'no-cache');
//		 res.json(JSON.parse(data));
//	 });
// });

// Performs a POST HTTP request, and (I think) calls the function when done.
// This one adds data to the JSON file.
// app.post('/' + jsonFileName + '.json', function(req, res) {
//	 fs.readFile(jsonFileName + '.json', function(err, data) {
//		 var comments = JSON.parse(data);
//		 comments.push(req.body);
//		 fs.writeFile(jsonFileName + '.json', JSON.stringify(comments, null, 4), function(err) {
//			 res.setHeader('Cache-Control', 'no-cache');
//			 res.json(comments);
//		 });
//	 });
// });

// TODO: Deal with booleans (they are returned as strings!).
app.get('/ajax', function (req, res) {
	console.log('GET:');
	console.log(req.query);
	if (true) {
		res.status(200).send(req.query);
	}
	if (!true) {
		res.status(500).send({error: req.query});
	}
	// timeout...
});
// TODO: Deal with booleans (they are returned as strings!).
app.post('/ajax', function (req, res) {
	console.log('POST:');
	console.log(req.body);
	if (true) {
		res.status(200).send(req.body);
	}
	if (!true) {
		res.status(500).send({error: req.body});
	}
	// timeout...
});
var week = function (req, number) {
	return {
		username: req.body.username,
		isAdmin: req.body.isAdmin,
		contestantStatus: {
			"1": {
				tribe: "Abu",
				votedFor: "3",
				achievements: {
					"CRIED": true,
					"HASHTAG": false
				}
			},
			"7": {
				tribe: "Abu",
				votedFor: "2",
				achievements: {
					"TREE-MAIL": true,
					"HASHTAG": true
				}
			},
			"2": {
				tribe: "Abu",
				votedFor: "3",
				achievements: {
					"CRIED": true,
					"HASHTAG": false,
					"TREE-MAIL": true
				}
			},
			"3": {
				tribe: "Abu",
				votedFor: "1",
				achievements: {
					"CRIED": true,
					"HASHTAG": false
				}
			},
			"4": {
				tribe: "Bala",
				votedFor: "5",
				achievements: {
					"CRIED": true,
					"HASHTAG": false
				}
			},
			"5": {
				tribe: "Bala",
				votedFor: "4",
				achievements: {
					"CRIED": true,
					"HASHTAG": false
				}
			},
			"6": {
				tribe: "Bala",
				votedFor: "4",
				achievements: {
					"HASHTAG": false
				}
			}
		},
		weekNumber: number,
		allContestants: {
			"1": {name: "Spencer"},
			"2": {name: "Kass"},
			"3": {name: "Jonny"},
			"4": {name: "Adam"},
			"5": {name: "Tom"},
			"6": {name: "Parvati"},
			"7": {name: "Sandra"}
		}
	};
};
app.post('/sign-in', function (req, res) {
	if (true) {
		res.status(200).send(week(req, 1));
	}
	if (!true) {
		res.status(500).send({error: req.body});
	}
	// timeout...
});
app.post('/v/1', function (req, res) {
	console.log('post v1');
	res.status(200).send(req.body);
});

// TODO: Understand this.
if (!module.parent) {
	app.listen(app.get('port'), function() {
		console.log('up and running');
	});
}
