var I = require('immutable');
var Map = I.Map;

var Achievements = Map({
	"CRIED": Map({
		text: 'Cried at least once during the episode.',
		alignment: 'bad',
		points: -20
	})
	,
	"TREE-MAIL": Map({
		text: 'Got tree mail for tribe.',
		alignment: 'good',
		points: 50
	})
	,
	"HASHTAG": Map({
		text: 'Said something or did something that got hashtaged.',
		alignment: 'good',
		points: 100
	})
	,
	"DESTROYED-GOODS": Map({
		text: 'Destroyed food or other tribe stuff.',
		alignment: 'bad',
		points: -200
	})
})

module.exports = Achievements;
