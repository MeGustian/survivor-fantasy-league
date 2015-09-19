var React = require('react');
var App = require('./containers/App');

// Planting the `App` (with the `Provider` wrapper component) in the root
// element.
root = document.getElementById('root');

React.render(
	React.createElement(App, null),
	root
);
