var tribeGrouping = function (weekNumber, contestants, withVotedOut) {
	return contestants
		.groupBy(function (contestant) {
			return contestant.getIn(['weeks', weekNumber, 'tribe']);
		})
		.filter(function (tribe, name) {return withVotedOut || !!name;}); // Works for empty string and undefined.
};
