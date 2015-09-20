var React = require('react');

AdminToolbox = {};

var Edit = React.createClass({displayName: "Edit",
	render: function () {
		return React.createElement("span", {class: "glyphicon glyphicon-pencil", "aria-hidden": "true"});
	}
})

module.exports = AdminToolbox;
