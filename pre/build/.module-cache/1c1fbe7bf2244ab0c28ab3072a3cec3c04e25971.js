var I = require('immutable');
var Map = I.Map;

var Achievements = Map({
	"CRIED": Map({
		text: 'Cried at least once during the episode.',
		points: -20
	})
	,
	"TREE-MAIL": Map({
		text: 'Got tree mail for tribe.',
		points: 50
	})
	,
	"HASHTAG": Map({
		text: 'Said something or did something that got hashtaged.',
		points: 100
	})
	,
	"DESTROYED-GOODS": Map({
		text: 'Destroyed food or other tribe stuff.',
		points: -200
	})
})

module.exports = Achievements;
