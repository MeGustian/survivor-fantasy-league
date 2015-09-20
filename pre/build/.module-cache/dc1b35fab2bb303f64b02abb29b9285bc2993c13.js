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
		payload: null
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

// Admin submit question.
act.question = function (question, answer, type) {
	return {
		type: 'QUESTION'
		,
		payload: {
			question: question,
			answer: answer,
			type: type
		}
	}
}

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

// Admin answers the questions.
act.answerAll = function (qAndA) {
	return {
		type: 'ADMIN-ANSWER-ALL'
		,
		payload: qAndA
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
