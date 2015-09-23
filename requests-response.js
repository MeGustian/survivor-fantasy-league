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
			questions: {ddddd
				<QuestionId>: {
					question: <String>,
					answer: <String>,
					type: <String>
			}
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
	'SIGN-OUT': {
		method: 'GET'
		,
		url: '/sign-out'
		,
		res: ... to be determined ...
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
	'CREATE-WEEK': {
		url: '/:userId/:weekNumber'
		,
		req: {
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
				}
			,
			weekNumber: <Number>
			,
			votedOut: <ContestantId>
		}

	}
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
			}
		,
		newWeekNumber: <Number>
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
