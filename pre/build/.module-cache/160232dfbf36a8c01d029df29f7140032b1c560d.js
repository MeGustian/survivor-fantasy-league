var combineReducers = require('redux').combineReducers;
var dummyDB = require('./dummyDB'); // The dummy for a JSON database.
var _ = require('lodash');
var I = require('immutable');
var List = I.List;
var Map = I.Map;
// TODO: Store tree in some DB and make editable.

// A reducer, which takes the state of the store an action passed from the
// store, and returns a new state of the store. It will only return something
// different if the action was relevant.

/**
 * The state parameters:
 * @var selected is the week selected. -1 indicates none.
 * @var count is the number of weeks that exist.
 */
var week = function (prev, action) {
	if (typeof prev === 'undefined') {
		return Map({selected: 1, count: dummyDB.Weeks.size});
	}
	switch (action.type) {
		case 'WEEK-VIEW-SELECT':
		return prev.set('selected', action.payload);
		case 'WEEK-EDIT-NEW':
		return prev.update('count', function (v) {return v+1});
		default:
		return prev;
	}
};

// State represents the tribes.
var tribes = function (prev, action) {
	if (typeof prev === 'undefined') {
		return dummyDB.Weeks.get(0).get("tribes");
	}
	switch (action.type) {
		case 'WEEK-VIEW-SELECT':
		return dummyDB.Weeks.has(action.payload) ? dummyDB.Weeks.get(action.payload).get("tribes") : prev;
		default:
		return prev;
	}
};

// State represents the questions and answers.
var questions = function (prev, action) {
	if (typeof prev === 'undefined') {
		return Map({});
	}
	switch (action.type) {
		case 'QUESTION':
		return prev.set(action.payload, null);
		case 'ANSWER':
		return prev.set(action.payload.question, action.payload.answer);
		default:
		return prev;
	}
};

// State represents all achievements of the selected week.
var achievements = function (prev, action) {
	if (typeof prev === 'undefined') {
		return Map({
			"1A1": Map({
				"CRIED": true,
				"TREE-MAIL": true,
				"HASHTAG": false
			})
			,
			"1A2": Map({
				"CRIED": true,
				"TREE-MAIL": true,
				"HASHTAG": false
			}),
			"1B1": Map({
				"DESTROYED-GOODS": true,
				"TREE-MAIL": true,
				"HASHTAG": false
			}),
			"1B2": Map({
				"CRIED": true,
				"TREE-MAIL": true,
				"HASHTAG": false
			}),
			"1B3": Map({
				"CRIED": true,
				"TREE-MAIL": true,
				"HASHTAG": false
			}),
			"2A1": Map({
				"CRIED": true,
				"TREE-MAIL": true,
				"HASHTAG": false
			}),
			"2A2": Map({
				"CRIED": true,
				"TREE-MAIL": true,
				"HASHTAG": false
			}),
			"2B1": Map({
				"CRIED": true,
				"TREE-MAIL": true,
				"HASHTAG": false
			}),
			"2B2": Map({
				"CRIED": true,
				"TREE-MAIL": true,
				"HASHTAG": false
			}),
			"2B3": Map({
				"CRIED": true,
				"TREE-MAIL": true,
				"HASHTAG": false
			})
		});
	}
	switch (action.type) {
		case 'TOGGLE-ACHIEVEMENT':
		return prev
			.get(action.payload.contestant)
			.update(action.payload.achievement, function (isAchieved) {
				console.log(!isAchieved);
				return !isAchieved;
			});
		case 'WEEK-VIEW-SELECT':
		return prev; // TODO: match the achievements.
		default:
		return prev;
	}
}

var reducers = combineReducers({
	week,
	tribes,
	questions,
	achievements
});

module.exports = reducers;
