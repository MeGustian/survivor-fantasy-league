var combineReducers = require('redux').combineReducers;
var dummyDB = require('./dummyDB'); // The dummy for a JSON database.
var _ = require('lodash');
var I = require('immutable');
var List = I.List;
var Map = I.Map;

var initialState = {};
// TODO: Install react-router (and react-redux-router) to change this
// to URL path's.
initialState.week = Map({selected: 1, count: dummyDB.Weeks.size});
initialState.tribes = dummyDB.Weeks.get(0).get("tribes");
initialState.questions = Map({
	"123624": Map({
		question: 'Will Mike eat a banana?',
		type: 'boolean',
		answer: false,
	}),
	"1373457": Map({
		question: 'Who is the one they were talking about?',
		type: 'contestant',
		answer: 'Oren'
	})
});
initialState.achievements = Map({
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
		return initialState.week;
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
		return initialState.tribes;
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
		return initialState.questions;
	}
	switch (action.type) {
		case 'QUESTION':
		return prev.set(Math.random(), Map({
			question: action.payload.question,
			type: action.payload.type
		}));
		case 'ANSWER':
		return prev.setIn([action.payload.id, 'answer'], action.payload.answer);
		default:
		return prev;
	}
};

// State represents all achievements of the selected week.
var achievements = function (prev, action) {
	if (typeof prev === 'undefined') {
		return initialState.achievements;
	}
	switch (action.type) {
		case 'TOGGLE-ACHIEVEMENT':
		return prev.updateIn([
			action.payload.contestant,
			action.payload.achievement
		], function (isAchieved) {
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
