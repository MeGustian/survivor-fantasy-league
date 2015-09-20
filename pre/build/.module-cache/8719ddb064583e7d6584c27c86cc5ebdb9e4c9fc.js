var React = require('react');

var toolToGlyphcon = {
	'edit': "pencil",
	'remove': "remove",
	'add': "plus",
	'approve': "ok",
	'discard': "minus"
}

var AdminToolbox = React.createClass({displayName: "AdminToolbox",
	render: function () {
		var glyphicon = toolToGlyphcon[tool];
		return (
			React.createElement("button", {type: "button", className: "btn btn-default btn-sm", onClick: this.handleClick}, 
				React.createElement("span", {className: "glyphicon glyphicon-" + glyphicon, "aria-hidden": "true"})
			)
		);
	}
	,
	handleClick: function () {
		var tool = this.props.tool;
		return this.props.handleClick(tool);
	}
});

module.exports = AdminToolbox;
