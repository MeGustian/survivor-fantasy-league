/**
* Contract: request-response.
* The name is the meta tag (both in request and response).
* The url specified is the url of the request.
*/
{
	'SIGN-IN': {
		method: 'POST'
		,
		url: '/'
		,
		req: {
			username:
			,
			password:
		}
		,
		res: {
			username:
			,
			allContestants:
			,
			weekNumber:
			,
			tribes:
		}
	}
	,
	'SIGN-OUT': {
		method: 'POST'
		,
		url: '/userId/sign-out'
	}
	,
	'TOGGLE-ACHIEVEMENT': {
		url: '/userId/weekNumber'
		,
		req: {
			contestantId:
			,
			achievement:
			,
			value:
		}
	}
	,
	'USER-ANSWER': {
		url: '/userId/weekNumber'
		,
		req: {
			questionId:
			,
			answer:
		}
	}
	,
	'CREATE-QUESTION': {
		url: '/userId/weekNumber'
		,
		res: {
			questionId:
		}
	}
	,
	'REMOVE-QUESTION': {
		url: '/userId/weekNumber'
		,
		req: {
			questionId:
		}
		,
		res: {
			questionId:
		}
	}
	,
	'UPDATE-QUESTION': {
		url: '/userId/weekNumber'
		,
		req: {
			questionId:
			,
			question: // Optional.
			,
			answer: // Optional.
		}
		,
		res: {
			questionId:
		}
	}
	,
	'ALL-CONTESTANTS': {
		url: '/'
		,
		res: {
			contestantCollection:
		}
	}
}
