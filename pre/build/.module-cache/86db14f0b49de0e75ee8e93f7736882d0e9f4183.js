var act = {};

// Player/Admin chose a week to view.
act.selectWeekView = function (index) {
	return {
		type: 'WEEK-VIEW-SELECT'
		,
		payload: index
	};
};

// Submit question.
act.question = function (questionStr) {
	return {
		type: 'QUESTION'
		,
		payload: questionStr
	}
}

// Submit answer to questions.
act.answer = function (questionId, answer) {
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
	console.log(contestant);
	return {
		type: 'TOGGLE-ACHIEVEMENT'
		,
		payload: {
			achievement: achievement,
			contestant: contestant,
		}
	}
}

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
