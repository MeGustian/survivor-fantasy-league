module.exports = function (state) {
	console.groupCollapsed('rendering with...');
	console.groupCollapsed('controller');
		console.log(state.controller.toString());
	console.groupEnd();
	console.groupCollapsed('navigation');
		console.log(state.navigation.toString());
	console.groupEnd();
	console.groupCollapsed('profile');
		console.log(state.profile.toString());
	console.groupEnd();
	console.groupCollapsed('contestants');
		console.log(state.contestants.toString());
	console.groupEnd();
	console.groupCollapsed('questions');
		console.log(state.questions.toString());
	console.groupEnd();
	console.groupEnd();
}
