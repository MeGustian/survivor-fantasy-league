var Promise = this.Promise || require('promise');
var request = require('superagent-promise')(require('superagent'), Promise);

var act = {};

var requestParser = function (data, requestType, url) {
	if (['GET', 'POST'].indexOf(requestType)<0) {
		console.warn('requestType is ' + requestType + '. Defaulted to \'Get\'');
		requestType = 'GET';
	}
	if (typeof url === 'undefined') {
		url = '/admin/1';
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

var actionParser = function (data, requestType, url) {
	return {
		meta: data.meta
		,
		types: [data.meta + '-PEND', data.meta + '-DONE', data.meta + '-FAIL']
		,
		payload: {
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
	}, 'POST', '/sign-in');
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
act.selectWeekView = function (index) {
	return actionParser({
		meta: 'WEEK-VIEW-SELECT',
		index: index
	}, 'GET');
};

// Admin creates question.
act.createQuestion = function () {
	return actionParser({
		meta: 'CREATE-QUESTION'
	}, 'POST');
};

// Admin removes question.
act.removeQuestion = function (questionId) {
	return actionParser({
		meta: 'REMOVE-QUESTION',
		questionId: questionId
	}, 'GET', '/admin/1');
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
act.updateQuestion = function (questionId, question, answer, type) {
	return actionParser({
		meta: 'UPDATE-QUESTION',
		questionId: questionId,
		question: question,
		answer: answer,
		type: type
	}, 'POST');
};

// User submit answer to questions.
act.userAnswer = function (questionId, answer) {
	return actionParser({
		meta: 'ANSWER',
		questionId: questionId,
		answer: answer
	}, 'POST');
};

// Admin toggles achievement of contestant.
act.toggleAchievement = function (achievement, contestant) {
	return actionParser({
		meta: 'TOGGLE-ACHIEVEMENT',
		achievement: achievement,
		contestant: contestant
	}, 'POST');
};

// Player choses contestants.
act.choose = function (listOfContestants) {
	return {
		type: 'PLAYER-CHOOSE-CONTESTANTS'
		,
		payload: listOfContestants
	};
};

// Admin sets the tribes.
act.setTribes = function (tribes) {
	return {
		type: 'ADMIN-SET-TRIBES'
		,
		payload: tribes
	};
};

module.exports = act;
