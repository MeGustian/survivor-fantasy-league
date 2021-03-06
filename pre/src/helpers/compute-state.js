var I = require('immutable');
var _ = require('lodash');
var AchievementsObj = require('../objects/Achievements');

// As a function, it takes the entire state of the stoe and returns an object
// with all the single computations, named to match the methods.
// As an object, it has methods that return a single computation.

var computeState = function (state) {
	var calc = computeState;
	return {
		scores: calc.scores(state, state.navigation.get('selectedWeek')),
		playerScore: calc.playerScore(state, state.navigation.get('selectedWeek'))
	};
};

// Map each contestant to an object that reduces his achievements according to
// their score.
computeState.scores = function (state, weekNumber) {
	return state.contestants
		.map(function (contestant, id) {
			return AchievementsObj
				.filter(function (theAchievement, achievementCode) {
					return !!contestant.getIn(['weeks', weekNumber, 'achievements', achievementCode]);
				})
				.reduce(function (reduction, theAchievement) {
					var points = theAchievement.get('points');
					if (theAchievement.get('extra') === '10*(weekNumber)') {
						points *= weekNumber;
					}
					var addTo = function (curr) {return curr+points};
					return reduction
						.update('total', addTo)
						.update(points>0 ? 'good' : 'bad', addTo);
				}, I.fromJS({good: 0, bad: 0, total: 0}));
			});
};

// Reduce player to score by the chosen.
computeState.playerScore = function (state, weekNumber) {

};

module.exports = computeState;
