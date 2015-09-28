var ini = {
	"isAdmin":"false",
	weekNumber:"2",
	// chosen:[
	// 	"56029683b2c3b5601f976290", "560296b7b2c3b5601f976291",
	// 	"560296e1b2c3b5601f976292", "56029707b2c3b5601f976293"
	// ],
	questions: {
		"125f": {
			weekNumber: "1",
			question: '1Cont?',
			answer: "56029683b2c3b5601f976290",
			type: 'contestant'
		},
		"345646a": {
			question: '-Num?',
			type: 'number'
		},
		"12asf5f": {
			weekNumber: "2",
			question: '2Cont?',
			type: 'contestant'
		},
		"1ab25f": {
			weekNumber: "2",
			question: '2Cont?',
			type: 'contestant'
		},
		"345646a": {
			weekNumber: "2",
			question: '2Num?',
			answer: 4,
			type: 'number'
		},
		"4576e": {
			weekNumber: "1",
			question: '1Bool?',
			answer: true,
			type: 'boolean'
		}
	},
	userAnswers: {
		"12asf5f": "56029683b2c3b5601f976290"
	},
	"contestants":{
		"56029683b2c3b5601f976290":{
			"_id":"56029683b2c3b5601f976290",
			"firstName":"Abi-Maria",
			"lastName":"Gomes",
			"age":"35",
			"occupation":"Business Student",
			"previousSeason":"Philippines",
			"place":"5/18",
			"weeks": {
				"1": {
					"tribe":"Ta-Keo",
					"votedFor":"",
					"achievements":{
						"CRIED": true,
						"HASHTAG": true
					}
				},
				"2": {
					"tribe":"Ta-Keo",
					"votedFor":"",
					"votedOut":true,
					"achievements":{
						"VOTED-OUT": true,
						"HASHTAG": true
					}
				}
			}
		},
		"560296b7b2c3b5601f976291":{
			"_id":"560296b7b2c3b5601f976291",
			"firstName":"Jeff",
			"lastName":"Varner",
			"age":"49",
			"occupation":"Internet Projects Manager",
			"previousSeason":"The Australian Outback",
			"place":"10/16",
			"weeks": {
				"1": {
					"tribe":"Ta-Keo",
					"votedFor":"",
					"achievements":{
						"CRIED": true,
						"HASHTAG": true
					}
				},
				"2": {
					"tribe":"Ta-Keo",
					"votedFor":"",
					"achievements":{
						"CRIED": true,
						"HASHTAG": true
					}
				}
			}
		},
		"560296b7b2c3b5601f979999":{
			"_id":"560296b7b2c3b5601f979999",
			"firstName":"Rob",
			"lastName":"Stark",
			"age":"24",
			"occupation":"Lala Projects Manager",
			"previousSeason":"The African Outback",
			"place":"11/16",
			"weeks": {
				"1": {
					"tribe":"Bada",
					"votedFor":"",
					"achievements":{
						"CRIED": true,
						"TREE-MAIL": true
					}
				},
				"2": {
					"tribe":"Bada",
					"votedFor":"",
					"achievements":{
						"CRIED": true,
						"HASHTAG": true
					}
				}
			}
		}
	}
};

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
app.post('/', function (req, res) {
	console.log('GET:');
	console.log(req.body);
	if (true) {
		res.status(200).send(req.body);
	}
	if (!true) {
		res.status(500).send({error: req.body});
	}
	// timeout...
});
app.get('/initial', function (req, res) {
	if (true) {
		res.status(200).send(ini);
	}
	if (!true) {
		res.status(500).send({error: req.body});
	}
	// timeout...
});
app.post('/:weekNumber', function (req, res) {
	res.status(200).send(req.body);
});

// TODO: Understand this.
if (!module.parent) {
	app.listen(app.get('port'), function() {
		console.log('up and running');
	});
}
