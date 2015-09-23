var combineReducers = require('redux').combineReducers;
var _ = require('lodash');
var I = require('immutable');
var List = I.List;
var Map = I.Map;
var Promise = this.Promise || require('promise');
var request = require('superagent-promise')(require('superagent'), Promise);

var initialState = {};
// TODO: Add server fail reducer to manage fails.

// A reducer, which takes the state of the store an action passed from the
// store, and returns a new state of the store. It will only return something
// different if the action was relevant.

// State represents sign-in status.
initialState.user = Map();
var user = function (prev, action) {
	if (typeof prev === 'undefined') {
		return initialState.user;
	}
	switch (action.type) {
		case 'GET-INITIAL-PEND':
		return initialState.user
			.set('attempting', true);
		case 'GET-INITIAL-DONE':
		return prev
			.set('attempting', false)
			.set('signedIn', true)
			.set('isAdmin', truthiness(action.payload.isAdmin));
		case 'GET-INITIAL-FAIL':
		return prev
			.set('attempting', false)
			.set('error', true);
		case 'SIGN-OUT-DONE':
		return initialState.week;
		// case 'SIGN-OUT':
		// return initialState.user
		// case 'SIGN-IN-PEND':
		// return initialState.user
		// 	.set('attempting', true);
		// case 'SIGN-IN-DONE':
		// return initialState.user
		// 	.set('isAdmin', truthiness(action.payload.isAdmin))
		// 	.remove('error');
		// case 'SIGN-IN-FAIL':
		// return initialState.user
		// 	.set('error', true);
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
		case 'GET-INITIAL-DONE':
		return prev
			.set('selected', action.payload.weekNumber)
			.set('count', action.payload.weekNumber)
			.set('contestantStatus', I.fromJS(action.payload.contestantStatus));
		case 'SIGN-OUT-DONE':
		return initialState.week;
		case 'WEEK-VIEW-SELECT-DONE':
		return prev
			.set('selected', action.payload.weekNumber)
			.set('contestantStatus', I.fromJS(action.payload.contestantStatus));
		case 'CREATE-WEEK-PEND':
		return prev
			.set('prev', prev)
			.update('selected', function (n) {return n+1})
			.update('count', function (n) {return n+1})
			.filter('contestantStatus', function (contestant, id) {
				return action.payload.removedContestants.indexOf(id)<0;
			});
		case 'CREATE-WEEK-DONE':
		return prev;
		case 'CREATE-WEEK-FAIL':
		return prev
			.get('prev');
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
		var success = checkProperties(action.payload, [
			'contestantId',
			'achievement'
		]);
		return !success ? prev
		 	.set('error', true) : prev
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
		case 'GET-INITIAL-DONE':
		return I.fromJS(action.payload.allContestants);
		case 'SIGN-OUT-DONE':
		return initialState.week;
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
		case 'GET-INITIAL-DONE':
		case 'WEEK-VIEW-SELECT-DONE':
		return I.fromJS(action.payload.questions)
			.map(function (details, id) {
				if (details.get('type') !== 'boolean' || !details.has('answer')) {
					return details;
				}
				return details.update('answer', function (boolString) {
					return truthiness(boolString);
				})
			});
		case 'SIGN-OUT-DONE':
		return initialState.week;
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
		var success = checkProperties(action.payload, [
			'questionId'
		]);
		return !success ? prev
		 	.set('error', true) : prev
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
		var success = checkProperties(action.payload, [
			'questionId'
		]);
		return !success ? prev
		 	.set('error', true) : prev
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
		var success = checkProperties(action.payload, [
			'questionId'
		]);
		return !success ? prev
		 	.set('error', true) : prev
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
	if (typeof bool === 'boolean' || typeof bool === 'undefined' || bool === null) {
		return !!bool;
	}
	if (typeof bool !== 'string') {
		throw '`truthiness` cannot handle this bool\'s type!';
	}
	return bool.toLowerCase() === 'true';
};

var checkProperties = function (obj, props) {
	return props.every(function (prop) {
		return obj.hasOwnProperty(prop);
	})
}

module.exports = reducers;
