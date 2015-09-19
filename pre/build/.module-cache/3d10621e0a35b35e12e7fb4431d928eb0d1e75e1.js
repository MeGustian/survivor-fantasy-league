var I = require('immutable');
var Map = I.Map;

var contestants = Map({
	"1A1": Map({
		name: 'Jack',
		gender: 'm'
	}),
	"1A2": Map({
		name: 'Karen',
		gender: 'f'
	}),
	"1B1": Map({
		name: 'Oren',
		gender: 'm'
	}),
	"1B2": Map({
		name: 'Alex',
		gender: 'm'
	}),
	"1B3": Map({
		name: 'Rachel',
		gender: 'f'
	}),
	"2A1": Map({
		name: 'Jack',
		gender: 'm'
	}),
	"2A2": Map({
		name: 'Karen',
		gender: 'f'
	}),
	"2B1": Map({
		name: 'Oren',
		gender: 'm'
	}),
	"2B2": Map({
		name: 'Alex',
		gender: 'm'
	}),
	"2B3": Map({
		name: 'Rachel',
		gender: 'f'
	})
});

var Contestant = function (_id) {
	var that = this;
	this.getId = function () {
		return _id;
	};
	this.getData = function () {
		console.log(contestants.get(_id));
		return contestants.get(_id);
	};
};

Contestant.prototype.stringify = function (modifier) {
	modifier = modifier || {};
	var str;
	// Check for modifiers. For now we just return the id.
	str = this.getId();
	return str;
};

Contestant.prototype.getName = function () {
	this.getData().get('name');
};

//
// Contestant.prototype.fetch = function (what) {
// 	// console.error({
// 	// 	fn: 'Contestant.prototype.fetch',
// 	// 	instance: this,
// 	// 	arguments: [what],
// 	// 	details: "Still not programmed.\nI'm supposed to fetch from DB."
// 	// });
// 	var id = this.getId();
// 	switch (what) {
// 		case 'NAME':
//
// 	}
// 	return "fetch error";
// };

module.exports = Contestant;
