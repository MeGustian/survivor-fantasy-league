var React = require('react');
var _ = require('lodash');
var Fantasy = require('./Fantasy');
var createStore = require('redux').createStore;
var applyMiddleware = require('redux').applyMiddleware;
var promiseMiddleware = require('redux-promise-middleware');
var loggerMiddlewareCreator = require('redux-logger');
var Provider = require('react-redux').Provider;
var reducers = require('../reducers');

// Middleware: log each action.
var logger = loggerMiddlewareCreator();
// var logger = function (store) {
// 	return function (next) {
// 		return function (action) {
// 			console.group(action.type);
// 			console.log('dispatching', action);
// 			var result = next(action);
// 			console.log('next state', store.getState());
// 			console.groupEnd();
// 			return result;
// 		};
// 	};
// };
// Middleware: patch promises according to superagent done/fail returns from
// Ajax call.
var patchPromiseWithSuperagent = function (store) {
	return function (next) {
		return function (action) {
			// Will always exist.
			var pendPayload = action.payload;
			// Will exist only in case of Ajax done/fail.
			var donePayload = _.get(action.payload, 'body');
			// Will exist only in case of Ajax fail.
			var failPayload = _.get(action.payload, 'body.error');
			// Will use the correct payload.
			var actionWithCorrectPayload = _.assign(
				{},
				action,
				{payload: failPayload || donePayload || pendPayload}
			);
			return next(actionWithCorrectPayload);
		};
	};
};
var createStoreWithMiddleware = applyMiddleware(
	promiseMiddleware,
	patchPromiseWithSuperagent,
	logger
)(createStore);
var store = createStoreWithMiddleware(reducers);

// We wrap the root component in a `Provider` component which provides the
// store. Pathways will select from the store what it needs, as dictated
// by the `select` function connected to it.
var App = React.createClass({displayName: "App",
	render: function () {
		return (
			React.createElement(Provider, {store: store}, 
				function () {return React.createElement(Fantasy, null); }
			)
		);
	}
});

module.exports = App;
