/**
 * Contract: request-response.
 * The name is the meta tag (both in request and response).
 * The url specified is the url of the request.
 */
{
'TOGGLE-ACHIEVEMENT': {
	url: '/userId/weekNumber',
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
	url: '/userId/weekNumber',
	req: {
		questionId:
		,
		answer:
	}
}
,
'CREATE-QUESTION': {
	url: '/userId/weekNumber',
	res: {
		questionId:
	}
}
,
'REMOVE-QUESTION': {
	url: '/userId/weekNumber',
	req: {
		questionId:
	}
}
,
'UPDATE-QUESTION': {
	url: '/userId/weekNumber',
	req: {
		questionId:
		,
		question: // Optional.
		,
		answer: // Optional.
	}
}
,
'ALL-CONTESTANTS': {
	url: '/'
	res: {
		contestantCollection:
	}
}
}
