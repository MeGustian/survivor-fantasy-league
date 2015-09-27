var React = require('react');
var Bs = require('react-bootstrap');
var AdminToolbox = require('./AdminToolbox');

var Admin = React.createClass({displayName: "Admin",
	render: function () {
		if (this.props.serverFail.get('is')) {
			return (
				React.createElement(Bs.Row, null, 
				React.createElement(Bs.Col, {md: 10, mdOffset: 1}, 
				React.createElement(Bs.Alert, {bsStyle: "danger"}, 
					React.createElement("h4", null, "Frak!"), 
					React.createElement("p", null, 
						"A server error has occured!" + this.props.serverFail.getIn(['details', 'messege'])
					)
				)
				)
				)
			);
		}
		if (false && this.props.user.get('isAdmin')) {
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

module.exports = Admin;
