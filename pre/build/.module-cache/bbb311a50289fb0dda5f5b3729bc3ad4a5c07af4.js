var combineReducers = require('redux').combineReducers;
var _ = require('lodash');
var I = require('immutable');
var List = I.List;
var Map = I.Map;
var Set = I.Set;
var Promise = this.Promise || require('promise');
var request = require('superagent-promise')(require('superagent'), Promise);

var initialState = I.fromJS({
	controller: {
		user: {
			signedIn: false
			,
			attempting: false
			,
			isAdmin: false
		}
		,
		error: {
			is: false
			,
			details: {action: '', messege: ''}
		}
	}
	,
	navigation: {
		 // location can be 'profile', 'week'.
		 // NOTE: Use `display: none` when switching to avoid remounting!
		location: 'profile'
		,
		weekCount: 0
		,
		selectedWeek: 0
	}
	,
	profile: {
		newbie: true
		,
		chosen: Set()
		,
		submittedChoices: false
	}
	,
	contestants: {}
	,
	questions: {
		// Question ID with content.
	}
});
// TODO: Add server fail reducer to manage fails.

// A reducer, which takes the state of the store an action passed from the
// store, and returns a new state of the store. It will only return something
// different if the action was relevant.

var controller = function (prev, action) {
	if (typeof prev === 'undefined') {
		return initialState.get('controller');
	}
	if (action.error === true && action.type !== 'GET-INITIAL-FAIL') {
		return prev
		 	.setIn(['error', 'is'], true)
		 	.setIn(['error', 'datails'], I.fromJS({details: action.payload}));
	}
	switch (action.type) {
		case 'GET-INITIAL-PEND':
		return initialState.get('controller')
			.setIn(['user', 'attempting'], true);
		case 'GET-INITIAL-DONE':
		return prev
			.setIn(['user', 'attempting'], false)
			.setIn(['user', 'signedIn'], true)
			.setIn(['user', 'isAdmin'], truthiness(action.payload.isAdmin));
		case 'GET-INITIAL-FAIL':
		return prev
			.setIn(['user', 'attempting'], false)
			.setIn(['error', 'is'], true)
			.setIn(['error', 'details', 'action'], action.type)
			.setIn(['error', 'details', 'messege'], "Could not connect to server.");
		default:
		return prev;
	}
};

var navigation = function (prev, action) {
	if (typeof prev === 'undefined') {
		return initialState.get('navigation');
	}
	switch (action.type) {
		case 'GET-INITIAL-DONE':
		return prev
			.set('selectedWeek', action.payload.weekNumber)
			.set('weekCount', action.payload.weekNumber);
		case 'NAVIGATE':
		return prev
			.set('location', action.payload.target);
		case 'WEEK-SELECT':
		return prev
			.set('selectedWeek', action.payload.weekNumber);
		default:
		return prev;
	}
};

var profile = function (prev, action) {
	if (typeof prev === 'undefined') {
		return initialState.get('profile');
	}
	switch (action.type) {
		case 'GET-INITIAL-DONE':
		return prev
			.set('chosen', Set(action.payload.chosen))
			.set('submittedChoices', !!action.payload.chosen);
		case 'CHOOSE-CONTESTANT':
		if (!prev.get('chosen').has(action.payload.id) && prev.get('chosen').size < 4) {
			console.log('Add');
			return prev.set('chosen', prev.get('chosen').add(action.payload.id));
		} else {
			console.log('Remove');
			return prev.set('chosen', prev.get('chosen').remove(action.payload.id));
		}
		case 'CONTESTANT-CHOICE-DONE':
		return prev
			.set('submittedChoices', true);
		default:
		return prev;
	}
};

var contestants = function (prev, action) {
	if (typeof prev === 'undefined') {
		return initialState.get('contestants');
	}
	switch (action.type) {
		case 'GET-INITIAL-DONE':
		return I.fromJS(action.payload.contestants);
		case 'TOGGLE-ACHIEVEMENT-PEND':
		return prev
			.updateIn([
				action.payload.contestantId,
				'weeks',
				action.payload.weekNumber,
				'achievements',
				action.payload.achievement
			], function (hasAchieved) {
				return !hasAchieved;
			});
		case 'TOGGLE-ACHIEVEMENT-DONE':
		return prev;
		case 'TOGGLE-ACHIEVEMENT-FAIL':
		var heardBack = checkProperties(action.payload, [
			'contestantId',
			'achievement'
		]);
		return !heardBack ? prev : prev
			.updateIn([
				action.payload.contestantId,
				'weeks',
				action.payload.weekNumber,
				'achievements',
				action.payload.achievement
			], function (hasAchieved) {
				return !hasAchieved;
			});
		// case 'TOGGLE-VOTED-OUT-PEND':
		// return prev
		// 	.updateIn([
		// 		'statuses',
		// 		prev.get('selectedWeek'),
		// 		action.payload.contestantId,
		// 		'votedOut'
		// 	], function (votedOut) {
		// 		return !votedOut;
		// 	});
		// case 'TOGGLE-VOTED-OUT-DONE':
		// return prev;
		// case 'TOGGLE-VOTED-OUT-FAIL':
		// var heardBack = checkProperties(action.payload, [
		// 	'contestantId',
		// 	'votedOut'
		// ]);
		// return !heardBack ? prev : prev
		// 	.updateIn([
		// 		'statuses',
		// 		prev.get('selectedWeek'),
		// 		action.payload.contestantId,
		// 		'votedOut'
		// 	], function (votedOut) {
		// 		return !votedOut;
		// 	});
		default:
		return prev;
	}
};

var questions = function (prev, action) {
	if (typeof prev === 'undefined') {
		return initialState.get('questions');
	}
	switch (action.type) {
		case 'GET-INITIAL-DONE':
		return I.fromJS(action.payload.questions)
				.map(function (details, id) { // Fix booleans...
					if (details.get('type') !== 'boolean' || !details.has('answer')) {
						return details;
					}
					return details.update('answer', function (boolString) {
						return truthiness(boolString);
					});
				});
		// case 'CREATE-QUESTION-DONE':
		// return prev
		// 	.set(action.payload.questionId, Map({
		// 		question: '',
		// 		type: action.payload.type,
		// 		isEditing: true
		// 	}));
		// case 'UPDATE-QUESTION-PEND':
		// return prev
		// 	.setIn([
		// 		action.payload.questionId,
		// 		'prev'
		// 	], prev.get(action.payload.questionId))
		// 	.mergeDeep(Map()
		// 		.set(action.payload.questionId, Map({
		// 			question: action.payload.question,
		// 			answer: action.payload.answer,
		// 			type: action.payload.type,
		// 			isEditing: false
		// 		})
		// 	));
		// case 'UPDATE-QUESTION-DONE':
		// return prev;
		// case 'UPDATE-QUESTION-FAIL':
		// var heardBack = checkProperties(action.payload, [
		// 	'questionId'
		// ]);
		// return !heardBack ? prev : prev
		// 	.set(action.payload.questionId, prev.getIn([
		// 		action.payload.questionId,
		// 		'prev'
		// 	]));
		// // EDIT
		// case 'EDIT-QUESTION':
		// return prev
		// 	.setIn([
		// 		action.payload.questionId,
		// 		'isEditing'
		// 	], !action.payload.isEditing);
		// // REMOVE
		// case 'REMOVE-QUESTION-PEND':
		// return prev
		// 	.setIn([
		// 		action.payload.questionId,
		// 		'removed'
		// 	], true);
		// case 'REMOVE-QUESTION-DONE':
		// return prev
		// 	.delete(action.payload.questionId);
		// case 'REMOVE-QUESTION-FAIL':
		// var heardBack = checkProperties(action.payload, [
		// 	'questionId'
		// ]);
		// return !heardBack ? prev : prev
		// 	.deleteIn([
		// 		action.payload.questionId,
		// 		'removed'
		// 	]);
		// ANSWER
		case 'USER-ANSWER-PEND':
		return prev
			.setIn([
				action.payload.questionId,
				'prevAnswer'
			], prev.getIn[action.payload.questionId, 'answer'])
			.setIn([
				action.payload.questionId,
				'answer'
			], action.payload.answer);
		case 'USER-ANSWER-DONE':
		return prev
			.deleteIn([
				action.payload.questionId,
				'prevAnswer'
			]);
		case 'USER-ANSWER-FAIL':
		var heardBack = checkProperties(action.payload, [
			'questionId'
		]);
		return !heardBack ? prev : prev
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
	controller,
	navigation,
	profile,
	contestants,
	questions
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
	});
};

module.exports = reducers;
