var I = require('immutable');
var _ = require('lodash');

// As a function, it takes the entire state and returns an object with
// computations.
// As an object, it has methods that return a single computation.

var computeState = function (state) {
	return questionCount = computeState.something(state.questions)

};

computeState.something = function (questions) {
	return 2;
};

module.exports = computeState;
