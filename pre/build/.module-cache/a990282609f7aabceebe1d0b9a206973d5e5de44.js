var I = require('immutable');
var Map = I.Map;

var contestants = Map({
	"id:1": Map({
		name: "Spencer",
		tribe: "Abu",
		votedFor: "Kass",
		achievements: Map({
			"CRIED": true,
			"HASHTAG": false
		}),
	}),
	"id:2": Map({
		name: "Kass",
		tribe: "Abu",
		votedFor: "Spencer",
		achievements: Map({
			"TREE-MAIL": true
		}),
	})
});

var Contestant = function (_id) {
	var that = this;
	this.getId = function () {
		return _id;
	};
	this.getData = function () {
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
	return this.getData().get('name');
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
