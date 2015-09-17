var combineReducers = require('redux').combineReducers;
var _ = require('lodash');
var I = require('immutable');
// TODO: Store tree in some DB and make editable.

// A reducer, which takes the state of the store an action passed from the
// store, and returns a new state of the store. It will only return something
// different if the action was relevant.
var someReducer = function (prev, action) {
	if (typeof prev === 'undefined') {
		return $_defaultForPrev;
	}
	switch (action.type) {
		case '1':
		return somePureFunction(action.payload);
		break;
		case '2':
		return anotherPureFunction(action.payload);
		break;
		default:
		return prev;
	}
};

var reducers = combineReducers({
	someReducer
});

module.exports = reducers;
