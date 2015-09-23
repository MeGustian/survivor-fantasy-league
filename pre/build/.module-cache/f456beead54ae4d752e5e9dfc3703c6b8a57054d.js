var React = require('react');

var SignIn = React.createClass({displayName: "SignIn",
	getInitialState: function () {
		return {
			username: 'some_user'
			,
			password: 'a_password'
			,
			isAdmin: false
		};
	}
	,
	render: function () {
		var style = {
			margin: 'auto',
			maxWidth: '480px',
			display: 'flex',
			flexDirection: 'column'
		}
		return (
			React.createElement("div", {style: style}, 
				React.createElement("div", {className: "input-group input-group-lg"}, 
					React.createElement("span", {className: "input-group-addon", id: "username-addon"}, "@"), 
					React.createElement("input", {type: "text", value: this.state.username, className: "form-control", placeholder: "Username", "aria-describedby": "username-addon", onChange: this.onTextUser}), 
					React.createElement("span", {className: "input-group-btn"}, 
						React.createElement("button", {className: "btn btn-danger" + (this.state.isAdmin ? " active" : ""), type: "button", onClick: this.toggleAdmin}, "Admin")
					)
				), 
				React.createElement("div", {className: "input-group input-group-lg"}, 
					React.createElement("span", {className: "input-group-addon", id: "password-addon"}, "**"), 
					React.createElement("input", {type: "text", value: this.state.password, className: "form-control", placeholder: "Password", "aria-describedby": "password-addon", onChange: this.onTextPass})
				), 
				React.createElement("button", {className: "btn btn-success", type: "button", disabled: this.props.user.get('attempting'), onClick: this.submit}, "Submit"), 
				this.failAlert()
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
		if (!p.user.get('attempting')) p.submit(s.username, s.password, s.isAdmin);
	}
	,
	failAlert: function () {
		var p = this.props;
		if (p.user.has('error')) {
			return React.createElement("div", {className: "alert alert-danger", role: "alert"}, p.user.get('error'))
		}
	}
})

module.exports = SignIn;
