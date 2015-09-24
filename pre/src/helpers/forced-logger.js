module.exports = function (state) {
	console.groupCollapsed('rendering with...');
	console.groupCollapsed('contestants');
		console.log(state.contestants.toString());
	console.groupEnd();
	console.groupCollapsed('week');
		console.log(state.week.toString());
	console.groupEnd();
	console.groupCollapsed('questions');
		console.log(state.questions.toString());
	console.groupEnd();
	console.groupCollapsed('user');
		console.log(state.user.toString());
	console.groupEnd();
	console.groupEnd();
}
