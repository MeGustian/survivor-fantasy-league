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
					name: <String>,
					// age: <Number>,
					// profession: <String>,
					// pastSeason: {
					// 	number: <Number>,
					// 	name: <String>,
					// 	place: <Number>
					// }
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
	'TOGGLE-ACHIEVEMENT': {
		url: '/:userId/:weekNumber'
		,
		req: {
			contestantId: <ContestantId>
			,
			achievement: <String>

			value : <boolean>
		}
		res: {
			contestantId: <ContestantId>
			,
			achievement: <String>
			,
			value: <Boolean>
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
