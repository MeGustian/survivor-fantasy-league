var I = require('immutable');
var _ = require('lodash');
var AchievementsObj = require('./objects/Achievements');

// As a function, it takes the entire state of the stoe and returns an object
// with all the single computations, named to match the methods.
// As an object, it has methods that return a single computation.

var computeState = function (state) {
	var calc = computeState;
	return {
		scores: calc.score(state)
	};
};

computeState.scores = function (state) {
	return AchievementsObj
		.filter(function (theAchievement, achievementCode) {
			return !!state.achievements.get(achievementCode);
		})
		.reduce(function (reduction, theAchievement) {
		switch (alignment) {
			case 'good':
			return theAchievement.get('points') > 0
			case 'bad':
			return theAchievement.get('points') < 0
			default:
			return false;
		}
	}, {good: 0, bad: 0, total: 0});
};

module.exports = computeState;
