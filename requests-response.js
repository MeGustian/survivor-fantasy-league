/**
* Contract: request-response.
* The primary property is the meta tag of both in request and response.
* Three dots after only entry in object mean there are multiple entries like
* it of the same shape.
*/
{
	'SIGN-IN': {
		method: 'POST'
		,
		url: '/sign-in'
		,
		req: {
			username: <String>
			,
			password: <String>
		}
		,
		res: {
			username: <String>
			,
			isAdmin: <Boolean>
			,
			questions: {
				<QuestionId>: <String>
				.
				.
				.
			}
			,
			contestantStatus: {
				<ContestantId>: {
					tribe: <String>,
					votedFor: <contestantId>,
					achievements: {
						<String>: <Boolean>
						.
						.
						.
					}
				}
				.
				.
				.
			})
			,
			weekNumber: <Number>
			,
			allContestants: {
				<ContestantId>: {
					firstName: <String>,
					lastName: <String>,
					age: <Number>,
					occupation: <String>,
					previousSeason: <String>,
					place: <String>
				}
				.
				.
				.
			}
		}
	}
	// ,
	// 'SIGN-OUT': {
	// 	method: 'POST'
	// 	,
	// 	url: '/sign-out'
	// }
	,
	'WEEK-VIEW-SELECT': {
		method: 'GET'
		,
		url: '/:userId/:weekNumber'
		,
		res: {
			contestantStatus: {
				<ContestantId>: {
					tribe: <String>,
					votedFor: <ContestantId>,
					achievements: {
						<String>: <Boolean>
						.
						.
						.
					}
				}
				.
				.
				.
			})
			,
			weekNumber: <Number>
		}
	}
	,
	'CREATE-WEEK': {
		url: '/:userId/:weekNumber'
		,
		req: {
			removedContestants: [
				<ContestantId>
				.
				.
				.
			]
		}
	,
	'TOGGLE-ACHIEVEMENT': {
		url: '/:userId/:weekNumber'
		,
		req: {
			contestantId: <ContestantId>
			,
			achievement: <String>
			,
			value: <Boolean>
		}
		res: {
			contestantId: <ContestantId>
			,
			achievement: <String>
		}
	}
	,
	'USER-ANSWER': {
		method: 'POST'
		,
		url: '/:userId/:weekNumber'
		,
		req: {
			questionId: <QuestionId>
			,
			answer: <String>
		}
		,
		res: {
			questionId: <QuestionId>
		}
	}
	,
	'CREATE-QUESTION': {
		url: '/:userId/:weekNumber'
		,
		req: {
			type: <String>
		}
		res: {
			questionId: <QuestionId>
			,
			type: <String>
		}
	}
	,
	'REMOVE-QUESTION': {
		method: 'POST'
		,
		url: '/:userId/:weekNumber'
		,
		req: {
			questionId: <QuestionId>
		}
		,
		res: {
			questionId: <QuestionId>
		}
	}
	,
	'UPDATE-QUESTION': {
		method: 'POST'
		,
		url: '/:userId/:weekNumber'
		,
		req: {
			questionId: <QuestionId>
			,
			question: [String]
			,
			answer: [String]
		}
		,
		res: {
			questionId: <QuestionId>
		}
	}
}
