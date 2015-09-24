/**
* Contract: request-response.
* The primary property is the meta tag of both in request and response.
* Three dots after only entry in object mean there are multiple (0 or more)
* entries like it of the same shape.
*/
{
	'GET-INITIAL': {
		method: 'GET'
		,
		url: '/initial'
		}
		,
		res: {
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
					votedOut: [Boolean],
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
	,
	'WEEK-VIEW-SELECT': {
		method: 'GET'
		,
		url: '/:weekNumber'
		,
		res: {
			contestantStatus: {
				<ContestantId>: {
					tribe: <String>,
					votedFor: <ContestantId>,
					votedOut: [Boolean],
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
		url: '/:weekNumber'
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
		url: '/:weekNumber'
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
		url: '/:weekNumber'
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
		url: '/:weekNumber'
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
		url: '/:weekNumber'
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
		url: '/:weekNumber'
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
