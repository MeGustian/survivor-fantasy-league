var React = require('react');
var Fantasy = require('./Fantasy');
var createStore = require('redux').createStore;
var applyMiddleware = require('redux').applyMiddleware;
var Provider = require('react-redux').Provider;
var reducers = require('../reducers');

// Middleware: log each action.
var logger = function (store) {
	return function (next) {
		return function (action) {
			console.group(action.type);
			console.log('dispatching', action);
			var result = next(action);
			console.log('next state', store.getState());
			console.groupEnd();
			return result;
		}
	}
}
var createStoreWithMiddleware = applyMiddleware(logger)(createStore)
var store = createStoreWithMiddleware(reducers);

// We wrap the root component in a `Provider` component which provides the
// store. Pathways will select from the store what it needs, as dictated
// by the `select` function connected to it.
var App = React.createClass({
	render: function () {
		return (
			<Provider store={store}>
				{function () {return <Fantasy />; }}
			</Provider>
		);
	}
});

module.exports = App;
