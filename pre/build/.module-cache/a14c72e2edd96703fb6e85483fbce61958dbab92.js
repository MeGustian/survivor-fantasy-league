var Promise = this.Promise || require('promise');
var request = require('superagent-promise')(require('superagent'), Promise);

var act = {};

var requestParser = function (data, requestType, url) {
	if (['GET', 'POST'].indexOf(requestType)<0) {
		console.warn('requestType is ' + requestType + '. Defaulted to \'Get\'');
		requestType = 'GET';
	}
	if (typeof url === 'undefined') {
		throw 'url undefined';
	}
	switch (requestType) {
		case 'POST':
		return request('POST', url)
			.send(data)
			.timeout(1000)
			.end();
		case 'GET':
		return request('GET', url)
			.query(data)
			.timeout(1000)
			.end();
		default:
		throw 'requestParser unknown error';
	}
};

var actionParser = function (data, requestType, circumstances) {
	var url = circumstances.url || '/' + circumstances.weekNumber;
	return {
		meta: data.meta
		,
		types: [data.meta + '-PEND', data.meta + '-DONE', data.meta + '-FAIL']
		,
		payload: {
			// promise: requestParser(data, requestType)
			promise: requestParser(data, requestType, url)
			,
			data: data
		}
	};
};

// Get information after being signed in.
act.getInitial = function () {
	return actionParser({
		meta: 'GET-INITIAL'
	}, 'GET', {url: '/initial'});
};

// Navigation.
act.navigate = function (target) {
	return {
		type: 'NAVIGATE'
		,
		payload: {
			target: target
		}
	};
};

// Player/Admin chose a week to view.
// act.generateNextWeek = function (circumstances, removedContestants) {
// 	return actionParser({
// 		meta: ''
// 	}, 'POST', {weekNumber: circumstances.weekNumber + 1});
// };

// Player/Admin chose a week to view.
act.selectWeek = function (circumstances, weekNumber) {
	return {
		type: 'WEEK-SELECT'
		,
		payload: {
			weekNumber: weekNumber
		}
	}
};

// Admin creates question.
act.createQuestion = function (circumstances, type) {
	return actionParser({
		meta: 'CREATE-QUESTION',
		type: type,
		weekNumber: circumstances.weekNumber
	}, 'POST', circumstances);
};

// Admin removes question.
act.removeQuestion = function (circumstances, questionId) {
	return actionParser({
		meta: 'REMOVE-QUESTION',
		questionId: questionId
	}, 'POST', circumstances);
};

// Admin enters edit mode.
// act.editQuestion = function (questionId, isEditing) {
// 	return {
// 		type: 'EDIT-QUESTION'
// 		,
// 		payload: {
// 			questionId: questionId,
// 			isEditing: isEditing
// 		}
// 	};
// };

// Admin submits question details.
act.updateQuestion = function (circumstances, questionId, question, answer, type) {
	return actionParser({
		meta: 'UPDATE-QUESTION',
		questionId: questionId,
		question: question,
		answer: answer,
		type: type
	}, 'POST', circumstances);
};

// User submit answer to questions.
act.userAnswer = function (circumstances, questionId, answer) {
	return actionParser({
		meta: 'USER-ANSWER',
		questionId: questionId,
		answer: answer
	}, 'POST', circumstances);
};

// Admin toggles achievement of contestant.
act.toggleAchievement = function (circumstances, achievement, contestantId, hasAchieved) {
	return actionParser({
		meta: 'TOGGLE-ACHIEVEMENT',
		achievement: achievement,
		contestantId: contestantId,
		value: !hasAchieved,
		weekNumber: circumstances.weekNumber
	}, 'POST', circumstances);
};

// Admin toggles voted out of contestant.
// act.toggleVotedOut = function (circumstances, contestantId, votedOut) {
// 	return actionParser({
// 		meta: 'TOGGLE-ACHIEVEMENT',
// 		contestantId: contestantId,
// 		value: !votedOut
// 	}, 'POST', circumstances);
// };

// Player choses contestants. // TODO: Make this work.
act.chooseContestant = function (id) {
	return {
		type: 'CHOOSE-CONTESTANT'
		,
		payload: {
			id: id
		}
	};
};

module.exports = act;
