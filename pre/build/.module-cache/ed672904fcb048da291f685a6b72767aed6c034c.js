var React = require('react');

var SignIn = React.createClass({displayName: "SignIn",
	getInitialState: function () {
		return {
			username: ''
			,
			password: ''
			,
			isAdmin: false
		};
	}
	,
	render: function () {
		return (
			React.createElement("div", null, 
				React.createElement("div", {className: "input-group"}, 
					React.createElement("span", {className: "input-group-addon", id: "username-addon"}, "@"), 
					React.createElement("input", {type: "text", value: this.state.username, className: "form-control", placeholder: "Username", "aria-describedby": "username-addon", onChange: this.onTextUser}), 
					React.createElement("span", {className: "input-group-btn"}, 
						React.createElement("button", {className: "btn btn-danger" + (this.state.isAdmin ? " active" : ""), type: "button", onClick: this.toggleAdmin}, "Admin")
					)
				), 
				React.createElement("div", {className: "input-group"}, 
					React.createElement("span", {className: "input-group-addon", id: "password-addon"}, "P"), 
					React.createElement("input", {type: "text", value: this.state.password, className: "form-control", placeholder: "Password", "aria-describedby": "password-addon", onChange: this.onTextPass})
				), 
				React.createElement("button", {className: "btn btn-success", type: "button", onClick: this.submit}, "Submit")
			)
		)
	}
	,
	toggleAdmin: function () {
		this.setState({isAdmin: !this.state.isAdmin});
	}
	,
	onTextUser: function (e) {
		this.setState({username: e.target.value});
	}
	,
	onTextPass: function (e) {
		this.setState({password: e.target.value});
	}
	,
	submit: function () {
		var s = this.state;
		var p = this.props;
		if (!p.attempting) p.submit(s.username, s.password);
	}
})

module.exports = SignIn;
