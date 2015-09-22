var React = require('react');

var toolToGlyphcon = {
	'edit': "pencil",
	'remove': "remove",
	'add': "plus",
	'approve': "ok",
	'discard': "pencil"
};

// I am using the AdminToolbox for the `add` which has an adjacent dropdown,
// hence the state and the wierd `if` statement. This solution is not ideal.
var AdminToolbox = React.createClass({displayName: "AdminToolbox",
	getInitialState: function () {
		return {
			type: 'bool'
		};
	}
	,
	render: function () {
		return React.createElement("div", null)
	}
});

module.exports = AdminToolbox;
