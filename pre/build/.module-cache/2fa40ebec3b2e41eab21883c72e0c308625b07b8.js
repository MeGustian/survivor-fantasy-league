var React = require('react');

AdminToolbox = {};

var Edit = React.createClass({displayName: "Edit",
	render: function () {
		return (
			React.createElement("button", {type: "button", class: "btn btn-default btn-sm"}, 
				React.createElement("span", {class: "glyphicon glyphicon-star", "aria-hidden": "true"}), " Star"
			)
		);
	}
	,
	handleClick
});

module.exports = AdminToolbox;
