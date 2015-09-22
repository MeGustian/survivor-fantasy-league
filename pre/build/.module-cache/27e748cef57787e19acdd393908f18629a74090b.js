var React = require('react');

var toolToGlyphcon = {
	'edit': "pencil",
	'remove': "remove",
	'add': "plus",
	'approve': "ok",
	'discard': "pencil"
};

var AdminToolbox = React.createClass({displayName: "AdminToolbox",
	getInitialState: function () {
		return {
			type: 'bool'
		};
	}
	,
	render: function () {
		var glyphicon = toolToGlyphcon[this.props.tool];
		return (
			React.createElement("button", {type: "button", className: "btn btn-default btn-sm", onClick: this.props.handleClick}, 
				React.createElement("span", {className: "glyphicon glyphicon-" + glyphicon, "aria-hidden": "true"})
			)
		);
	}
});

module.exports = AdminToolbox;
