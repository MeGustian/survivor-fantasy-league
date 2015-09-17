var act = {};

// Player/Admin chose a week to view.
act.week = function (index) {
	console.log('act.someAction');
	return {
		type: 'WEEK-VIEW'
		,
		payload: index
	};
};

// Player/Admin answer all questions.
act.answer = function (qAndA) {
	console.log('act.someAction');
	return {
		type: 'ANSWER'
		,
		payload: qAndA
	};
};

// Player choses contestants.
act.choose = function (listOfContestants) {
	console.log('act.someAction');
	return {
		type: 'PLAYER-CHOOSE-CONTESTANTS'
		,
		payload: listOfContestants
	};
};

// Admin answers the questions.
act.answerAll = function (qAndA) {
	console.log('act.someAction');
	return {
		type: 'ADMIN-ANSWER-ALL'
		,
		payload: qAndA
	};
};

// Admin sets the tribes.
act.setTribes = function (tribes) {
	console.log('act.someAction');
	return {
		type: 'ADMIN-SET-TRIBES'
		,
		payload: tribes
	};
};

module.exports = act;
