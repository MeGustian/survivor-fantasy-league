var Promise = this.Promise || require('promise');
var request = require('superagent-promise')(require('superagent'), Promise);

var act = {};

var promiseTypes = function (type) {
	return [type + '-PEND', type + '-DONE', type + '-FAIL'];
};

// My first currying, exsiting!
var errorHandler = function (data) {
	return function (jqXHR, textStatus, errorThrown) {
		if (textStatus === 'timeout') {
			// TODO: Alert user to reload page.
		}
	}
};

// Sign in.
act.signIn = function (userId) {
	return {
		type: 'SIGN-IN'
		,
		payload: userId
	};
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
	return {
		type: 'WEEK-VIEW-SELECT'
		,
		payload: index
	};
};

// Admin creates question.
act.createQuestion = function () {
	return {
		type: 'NEW-QUESTION'
		,
		payload: undefined
	};
};

// Admin removes question.
act.removeQuestion = function (questionId) {
	var data = {
		meta: 'REMOVE-QUESTION',
		questionId: questionId
	};
	return {
		meta: data.meta
		,
		types: promiseTypes(data.meta)
		,
		payload: {
			promise: $.ajax({
				url: '/ajax',
				data: data,
				timeout: 1000,
				error: errorHandler(data)
			})
			,
			data: data
		}
	};
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
	var data = {
		meta: 'UPDATE-QUESTION',
		questionId: questionId,
		question: question,
		answer: answer,
		type: type
	};
	return {
		types: promiseTypes(data.meta)
		,
		payload: {
			promise: request
				.get('/ajax')
				.query(data)
				.timeout(1000)
				.end()
			,
			data: data
		}
	};
};

// User submit answer to questions.
act.userAnswer = function (questionId, answer) {
	var data = {
		meta: 'ANSWER',
		questionId: questionId,
		answer: answer
	};
	return {
		types: promiseTypes(data.meta)
		,
		payload: {
			promise: $.ajax({
				url: '/ajax',
				data: data,
				timeout: 1000,
				error: errorHandler(data)
			})
			,
			data: data
		}
	};
};

// Admin toggles achievement of contestant.
act.toggleAchievement = function (achievement, contestant) {
	var data = {
		meta: 'TOGGLE-ACHIEVEMENT',
		achievement: achievement,
		contestant: contestant
	};
	return {
		types: promiseTypes(data.meta)
		,
		payload: {
			promise: $.ajax({
				url: '/ajax',
				data: data,
				timeout: 1000,
				error: errorHandler(data)
			})
			,
			data: data
		}
	};
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
