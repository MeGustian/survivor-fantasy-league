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
	var url = circumstances.url || '/' + circumstances.userId + '/' + circumstances.weekNumber;
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

// Sign in.
act.signIn = function (username, password, isAdmin) {
	return actionParser({
		meta: 'SIGN-IN',
		username: username,
		password: password,
		isAdmin: isAdmin
	}, 'POST', {url: '/sign-in'});
};

// Sign out.
act.signOut = function () {
	return {
		type: 'SIGN-OUT'
		,
		payload: undefined
	};
};

// Player/Admin chose a week to view.
act.selectWeekView = function (circumstances, number) {
	return actionParser({
		meta: 'WEEK-VIEW-SELECT'
	}, 'GET', {userId: circumstances.userId, weekNumber: number});
};

// Admin creates question.
act.createQuestion = function (circumstances) {
	return actionParser({
		meta: 'CREATE-QUESTION'
	}, 'POST', circumstances);
};

// Admin removes question.
act.removeQuestion = function (circumstances, questionId) {
	return actionParser({
		meta: 'REMOVE-QUESTION',
		questionId: questionId
	}, 'GET', circumstances);
};

// Admin enters edit mode.
act.editQuestion = function (questionId, isEditing) {
	return {
		type: 'EDIT-QUESTION'
		,
		payload: {
			questionId: questionId,
			isEditing: isEditing
		}
	};
};

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
		meta: 'ANSWER',
		questionId: questionId,
		answer: answer
	}, 'POST', circumstances);
};

// Admin toggles achievement of contestant.
act.toggleAchievement = function (circumstances, achievement, contestant) {
	return actionParser({
		meta: 'TOGGLE-ACHIEVEMENT',
		achievement: achievement,
		contestant: contestant
	}, 'POST', circumstances);
};

// Player choses contestants.
act.choose = function (listOfContestants) {
	return {
		type: 'PLAYER-CHOOSE-CONTESTANTS'
		,
		payload: listOfContestants
	};
};

module.exports = act;
