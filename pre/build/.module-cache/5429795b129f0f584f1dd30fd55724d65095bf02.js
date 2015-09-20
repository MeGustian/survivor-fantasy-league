var act = {};

// Log in.
act.logIn = function (userId) {
	return {
		type: 'LOG-IN'
		,
		payload: userId
	}
};

// Log out.
act.logOut = function () {
	return {
		type: 'LOG-OUT'
		,
		payload: undefined
	}
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
	}
};

// Admin removes question.
act.removeQuestion = function (questionId) {
	return {
		type: 'REMOVE-QUESTION'
		,
		payload: questionId
	}
};

// Admin submits question details.
act.updateQuestion = function (questionId, question, answer, type) {
	return {
		type: 'UPDATE-QUESTION'
		,
		payload: {
			questionId: questionId,
			question: question,
			answer: answer,
			type: type,
			isEditing: false
		}
	}
};

// User submit answer to questions.
act.userAnswer = function (questionId, answer) {
	return {
		type: 'ANSWER'
		,
		payload: {
			id: questionId,
			answer: answer
		}
	};
};

act.toggleAchievement = function (achievement, contestant) {
	return {
		type: 'TOGGLE-ACHIEVEMENT'
		,
		payload: {
			achievement: achievement,
			contestant: contestant,
		}
	}
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
