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
			chosen: <Array: ContestantId>
			,
			questions: {
				<QuestionId>: {
					weekNumber: <Number>,
					question: <String>,
					answer: <String|Number|ContestantId>, // The user's answer, not the actual answer.
					type: <String>
				}
				.
				.
				.
			}
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
			,
			contestantStatus: {
				<Number>: {
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
				}
				.
				.
				.
			}
			,
		}
	}
	,
	'CONTESTANT-CHOICE': {
		method: 'POST'
		,
		url: '/'
		,
		req: {
			chosen: <Array: ContestantId>
		}
	}
	// ,
	// 'TOGGLE-VOTED-OUT': {
	// 	url '/:weekNumber'
	// 	,
	// 	method: 'POST'
	// 	,
	// 	req: {
	// 		contestantId: <ContestantId>
	// 		,
	// 		value: <Boolean>
	// 	}
	// 	,
	// 	res: {
	// 		contestantId: <ContestantId>
	// 	}
	// }
	// ,
	// 'CREATE-WEEK': {
	// 	url: '/:weekNumber'
	// 	,
	// 	method: 'POST'
	// }
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
	// ,
	// 'CREATE-QUESTION': {
	// 	url: '/:weekNumber'
	// 	,
	// 	req: {
	// 		type: <String>
	// 	}
	// 	res: {
	// 		questionId: <QuestionId>
	// 		,
	// 		type: <String>
	// 	}
	// }
	// ,
	// 'REMOVE-QUESTION': {
	// 	method: 'POST'
	// 	,
	// 	url: '/:weekNumber'
	// 	,
	// 	req: {
	// 		questionId: <QuestionId>
	// 	}
	// 	,
	// 	res: {
	// 		questionId: <QuestionId>
	// 	}
	// }
	// ,
	// 'UPDATE-QUESTION': {
	// 	method: 'POST'
	// 	,
	// 	url: '/:weekNumber'
	// 	,
	// 	req: {
	// 		questionId: <QuestionId>
	// 		,
	// 		question: [String]
	// 		,
	// 		answer: [String]
	// 	}
	// 	,
	// 	res: {
	// 		questionId: <QuestionId>
	// 	}
	// }
}
