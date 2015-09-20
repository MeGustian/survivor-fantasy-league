var combineReducers = require('redux').combineReducers;
var dummyDB = require('./dummyDB'); // The dummy for a JSON database.
var _ = require('lodash');
var I = require('immutable');
var List = I.List;
var Map = I.Map;

var initialState = {};
initialState.user = Map({userId: "47901", isAdmin: true})
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

// State represents week.
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
			'achievements',
			action.payload.achievement
		], function (isAchieved) {
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
		case 'CREATE-QUESTION':
		return prev.set(Math.random(), Map({
			question: '',
			type: 'boolean'
		}));
		case 'UPDATE-QUESTION-PEND':
		return prev.setIn([
			'pending',
			action.payload.questionId
		], Map({
			question: action.payload.question,
			answer: action.payload.answer,
			type: action.payload.type,
			isEditing: false
		}));
		case 'UPDATE-QUESTION-DONE':
		return prev.set(action.payload.questionId, prev.getIn([
			'pending',
			action.payload.questionId
		]));
		case 'UPDATE-QUESTION-FAIL':
		return prev.delete('pending');
		case 'EDIT-QUESTION':
		return prev.setIn([
			action.payload.questionId,
			'isEditing'
		], !action.payload.isEditing);
		case 'REMOVE-QUESTION-PEND':
		return prev.setIn([
			action.payload,
			'removed'
		], true).set('removed', action.payload);
		case 'REMOVE-QUESTION-DONE':
		return prev.delete(action.payload).delete('removed');
		case 'REMOVE-QUESTION-FAIL':
		return prev.deleteIn([
			prev.get('removed'),
			'removed'
		]).delete('removed');
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
