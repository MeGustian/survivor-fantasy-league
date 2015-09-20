var combineReducers = require('redux').combineReducers;
var dummyDB = require('./dummyDB'); // The dummy for a JSON database.
var _ = require('lodash');
var I = require('immutable');
var List = I.List;
var Map = I.Map;

var initialState = {};
initialState.user = Map({userId: undefined, isAdmin: true})
// TODO: Install react-router (and react-redux-router) to change week switches
// to URL path's.
initialState.week = Map({selected: 1, count: 4});
initialState.contestants = Map({
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
/* initialState.achievements = Map({
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
*/

// A reducer, which takes the state of the store an action passed from the
// store, and returns a new state of the store. It will only return something
// different if the action was relevant.

// State represents log-in status.
var user = function (prev, action) {
	if (typeof prev === 'undefined') {
		return initialState.user;
	}
	switch (action.type) {
		case 'LOG-OUT':
		return initialState.user
		case 'LOG-IN':
		// TODO: Request authorization from server.
		return Map({user: userId, isAdmin: checkAdminStatus(userId)})
		default:
		return prev;
	}
};
var checkAdminStatus = function (userId) {
	// TODO: Request from server. Default to `false`.
	return false;
};

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
		default:
		return prev;
	}
};

// State represents the contestants.
var contestants = function (prev, action) {
	if (typeof prev === 'undefined') {
		return initialState.contestants;
	}
	switch (action.type) {
		case 'TOGGLE-ACHIEVEMENT':
		return prev.updateIn([
			action.payload.contestant,
			'achievments',
			action.payload.achievment
		], function (isAchieved) {
			console.log(isAchieved);
			return !isAchieved;
		});
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
		case 'NEW-QUESTION':
		return prev.set(Math.random(), Map({
			question: '',
			type: 'boolean'
		}));
		case 'UPDATE-QUESTION':
		return prev.set(action.payload.questionId, Map({
			question: action.payload.question,
			answer: action.payload.answer,
			type: action.payload.type,
			isEditing: false
		}));
		case 'EDIT-QUESTION':
		return prev.setIn([
			action.payload.questionId,
			'isEditing'
		], !action.payload.isEditing);
		case 'REMOVE-QUESTION':
		return prev.delete(action.payload);
		case 'ANSWER':
		return prev.setIn([
			action.payload.questionId,
			'answer'
		], action.payload.answer);
		default:
		return prev;
	}
};

// State represents all achievements of the selected week.
// var achievements = function (prev, action) {
// 	if (typeof prev === 'undefined') {
// 		return initialState.achievements;
// 	}
// 	switch (action.type) {
// 		case 'TOGGLE-ACHIEVEMENT':
// 		return prev.updateIn([
// 			action.payload.contestant,
// 			action.payload.achievement
// 		], function (isAchieved) {
// 			return !isAchieved;
// 		});
// 		case 'WEEK-VIEW-SELECT':
// 		return prev; // TODO: match the achievements.
// 		default:
// 		return prev;
// 	}
// }

var reducers = combineReducers({
	week,
	contestants,
	questions,
	user
});

module.exports = reducers;
