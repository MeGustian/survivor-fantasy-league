var act = {};

var promiseTypes = function (type) {
	return [type + '-PEND', type + '-DONE', type + '-FAIL'];
}

// Sign in.
act.signIn = function (userId) {
	return {
		type: 'SIGN-IN'
		,
		payload: userId
	}
};

// Sign out.
act.signOut = function () {
	return {
		type: 'SIGN-OUT'
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
		types: promiseTypes('REMOVE-QUESTION')
		,
		payload: {
			promise: $.ajax({
				url: '/ajax',
				timeout: 1000
			})
			,
			data: questionId
		}
	}
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
	}
};

// Admin submits question details.
act.updateQuestion = function (questionId, question, answer, type) {
	return {
		types: promiseTypes('UPDATE-QUESTION')
		,
		payload: {
			promise: $.ajax({
				url: '/ajax',
				timeout: 1000
			})
			,
			data: {
				questionId: questionId,
				question: question,
				answer: answer,
				type: type
			}
		}
	}
};

// User submit answer to questions.
act.userAnswer = function (questionId, answer) {
	return {
		type: 'ANSWER'
		,
		payload: {
			questionId: questionId,
			answer: answer
		}
	};
};

// Admin toggles achievement of contestant.
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
