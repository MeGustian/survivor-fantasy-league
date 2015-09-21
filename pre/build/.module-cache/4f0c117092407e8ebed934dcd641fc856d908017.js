var React = require('react');

var LogIn = React.createClass({displayName: "LogIn",
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
			React.createElement("form", null, 
				React.createElement("div", {className: "input-group"}, 
					React.createElement("span", {className: "input-group-addon", id: "username-addon"}, "@"), 
					React.createElement("input", {type: "text", className: "form-control", placeholder: "Username", "aria-describedby": "username-addon"}), 
					React.createElement("span", {className: "input-group-btn"}, 
						React.createElement("button", {className: "btn btn-danger" + (this.state.isAdmin ? " active" : ""), type: "button"}, "Admin")
					)
				), 
				React.createElement("div", {className: "input-group"}, 
					React.createElement("span", {className: "input-group-addon", id: "password-addon"}, "P"), 
					React.createElement("input", {type: "text", className: "form-control", placeholder: "Password", "aria-describedby": "password-addon"})
				)
			)
		)
	}
})

module.exports = LogIn;
