var React = require('react');
var Bs = require('react-bootstrap');
var AdminToolbox = require('./AdminToolbox');

module.exports = React.createClass({displayName: "exports",
	render: function () {
		if (this.props.serverFail) {
			return (
				React.createElement(Bs.Alert, {bsStyle: "danger"}, 
					React.createElement("h4", null, "Frak!"), 
					React.createElement("p", null, 
						"A server error has occured! Whatever changes you make may not be recorded."
					)
				)
			);
		}
		if (this.props.user.get('isAdmin')) {
			return (
				React.createElement(AdminToolbox, {
					tool: "add", 
					handleClick: this.createQuestion}
				)
			);
		}
		return React.createElement("div", null);
	}
	,
	createQuestion: function (type) {
		this.props.createQuestion(type);
	}
})
