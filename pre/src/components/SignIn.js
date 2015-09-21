var React = require('react');

var SignIn = React.createClass({
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
			<div>
				<div className="input-group">
					<span className="input-group-addon" id="username-addon">@</span>
					<input type="text" value={this.state.username} className="form-control" placeholder="Username" aria-describedby="username-addon" onChange={this.onTextUser} />
					<span className="input-group-btn">
						<button className={"btn btn-danger" + (this.state.isAdmin ? " active" : "")} type="button" onClick={this.toggleAdmin}>Admin</button>
					</span>
				</div>
				<div className="input-group">
					<span className="input-group-addon" id="password-addon">P</span>
					<input type="text" value={this.state.password} className="form-control" placeholder="Password" aria-describedby="password-addon" onChange={this.onTextPass} />
				</div>
				<button className={"btn btn-success"} type="button" disabled={this.props.user.get('attempting')} onClick={this.submit}>Submit</button>
				{this.failAlert()}
			</div>
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
			return <div className="alert alert-danger" role="alert">p.user.get('error')</div>
		}
	}
})

module.exports = SignIn;
