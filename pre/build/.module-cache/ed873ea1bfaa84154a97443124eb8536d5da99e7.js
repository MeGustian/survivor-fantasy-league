var combineReducers = require('redux').combineReducers;
var _ = require('lodash');
var I = require('immutable');
var List = I.List;
var Map = I.Map;
var Promise = this.Promise || require('promise');
var request = require('superagent-promise')(require('superagent'), Promise);

var initialState = {};
// TODO: Install react-router (and react-redux-router) to change week switches
// to URL path's.

// A reducer, which takes the state of the store an action passed from the
// store, and returns a new state of the store. It will only return something
// different if the action was relevant.

// State represents sign-in status.
initialState.user = Map({userId: undefined, isAdmin: false, attempting: false});
var user = function (prev, action) {
	if (typeof prev === 'undefined') {
		return initialState.user;
	}
	switch (action.type) {
		case 'SIGN-OUT':
		return initialState.user
		case 'SIGN-IN-PEND':
		return initialState.user
			.set('attempting', true);
		case 'SIGN-IN-DONE':
		return initialState.user
			.set('userId', action.payload.username)
			.set('isAdmin', truthiness(action.payload.isAdmin))
			.remove('error');
		case 'SIGN-IN-FAIL':
		return initialState.user
			.set('error', 'Sign-in failed!');
		default:
		return prev;
	}
};

// State represents week.
initialState.week = Map({selected: undefined, count: 16, contestantStatus: Map()});
var week = function (prev, action) {
	if (typeof prev === 'undefined') {
		return initialState.week;
	}
	switch (action.type) {
		case 'SIGN-IN-DONE':
		case 'WEEK-VIEW-SELECT-DONE':
		return prev
			.set('selected', action.payload.weekNumber)
			.set('contestantStatus', I.fromJS(action.payload.contestantStatus));
		case 'TOGGLE-ACHIEVEMENT-PEND':
		return prev
			.updateIn([
				'contestantStatus',
				action.payload.contestantId,
				'achievements',
				action.payload.achievement
			], function (hasAchieved) {
				return !hasAchieved;
			});
		case 'TOGGLE-ACHIEVEMENT-DONE':
		return prev;
		case 'TOGGLE-ACHIEVEMENT-FAIL':
		return prev
			.updateIn([
				'contestantStatus',
				action.payload.contestantId,
				'achievements',
				action.payload.achievement
			], function (hasAchieved) {
				return !hasAchieved;
			});
		default:
		return prev;
	}
};

// State represents the contestants.
initialState.contestants = Map();
var contestants = function (prev, action) {
	if (typeof prev === 'undefined') {
		return initialState.contestants;
	}
	switch (action.type) {
		case 'SIGN-IN-DONE':
		return I.fromJS(action.payload.allContestants);
		default:
		return prev;
	}
};

// State represents the questions and answers.
initialState.questions = Map();
var questions = function (prev, action) {
	if (typeof prev === 'undefined') {
		return initialState.questions;
	}
	switch (action.type) {
		case 'SIGN-IN-DONE':
		case 'WEEK-VIEW-SELECT-DONE':
		return I.fromJS(action.payload.questions)
			.map(function (details, id) {
				console.log(details);
				if (details.get('type') !== 'bool') {
					return details;
				}
				return details.update('answer', function (boolString) {
					return truthiness(boolString);
				})
			});
		case 'CREATE-QUESTION-DONE':
		return prev
			.set(action.payload.questionId, Map({
				question: '',
				type: action.payload.type,
				isEditing: true
			}));
		// UPDATE // NOTE: This is undo-ready (using the prevs).
		case 'UPDATE-QUESTION-PEND':
		return prev
			.setIn([
				action.payload.questionId,
				'prev'
			], prev.get(action.payload.questionId))
			.mergeDeep(Map()
				.set(action.payload.questionId, Map({
					question: action.payload.question,
					answer: action.payload.answer,
					type: action.payload.type,
					isEditing: false
				})
			));
		case 'UPDATE-QUESTION-DONE':
		return prev;
		case 'UPDATE-QUESTION-FAIL':
		return prev
			.set(action.payload.questionId, prev.getIn([
				action.payload.questionId,
				'prev'
			]));
		// EDIT
		case 'EDIT-QUESTION':
		return prev
			.setIn([
				action.payload.questionId,
				'isEditing'
			], !action.payload.isEditing);
		// REMOVE
		case 'REMOVE-QUESTION-PEND':
		return prev
			.setIn([
				action.payload.questionId,
				'removed'
			], true);
		case 'REMOVE-QUESTION-DONE':
		return prev
			.delete(action.payload.questionId);
		case 'REMOVE-QUESTION-FAIL':
		return prev
			.deleteIn([
				action.payload.questionId,
				'removed'
			]);
		// ANSWER
		case 'ANSWER-PEND':
		return prev
			.setIn([
				action.payload.questionId,
				'prevAnswer'
			], prev.getIn[action.payload.questionId, 'answer'])
			.setIn([
				action.payload.questionId,
				'answer'
			], action.payload.answer);
		case 'ANSWER-DONE':
		return prev
			.deleteIn([
				action.payload.questionId,
				'prevAnswer'
			]);
		case 'ANSWER-FAIL':
		return prev
			.setIn([
				action.payload.questionId,
				'answer'
			], prev.getIn[action.payload.questionId, 'prevAnswer'])
			.deleteIn([
				action.payload.questionId,
				'prevAnswer'
			]);
		default:
		return prev;
	}
};

var reducers = combineReducers({
	week,
	contestants,
	questions,
	user
});

var truthiness = function (bool) {
	if (typeof bool === 'boolean') {
		return bool;
	}
	if (typeof bool !== 'string') {
		throw 'Neither boolean nor string returned from server for boolean value';
	}
	return bool.toLowerCase() === 'true';
};

module.exports = reducers;
