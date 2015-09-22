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
		return tool === 'add' ? (
			React.createElement("button", {type: "button", className: "btn btn-default btn-sm", onClick: this.props.handleClick}, 
				React.createElement("span", {className: "glyphicon glyphicon-" + glyphicon, "aria-hidden": "true"}), 
				React.createElement("button", {type: "button", className: "btn btn-default dropdown-toggle", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false"}, 
					this.state.type + " ", 
					React.createElement("span", {className: "caret"})
				), 
				React.createElement("ul", {className: "dropdown-menu"}, 
				React.createElement("li", {onClick: this.setState({type: 'bool'})}, React.createElement("a", null, "Boolean")), 
				React.createElement("li", {onClick: this.setState({type: 'contestant'})}, React.createElement("a", null, "Contestant"))
				)
			)
		) : (
			React.createElement("button", {type: "button", className: "btn btn-default btn-sm", onClick: this.props.handleClick}, 
				React.createElement("span", {className: "glyphicon glyphicon-" + glyphicon, "aria-hidden": "true"})
			)
		);
	}
});

module.exports = AdminToolbox;
