var React = require('react');
var Bs = require('react-bootstrap');

module.exports = React.createClass({displayName: "exports",
	render: function () {
		if (this.props.serverFail) {
			return (
				React.createElement(Bs.Alert, {bsStyle: "danger"}, 
					"An error has occured. Data may have not been saved!"
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
