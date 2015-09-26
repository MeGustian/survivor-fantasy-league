var React = require('react');
var Bs = require('react-bootstrap');
var AdminToolbox = require('./AdminToolbox');

module.exports = React.createClass({
	render: function () {
		if (this.props.serverFail.get('is')) {
			return (
				<Bs.Row>
				<Bs.Col md={10} mdOffset={1}>
				<Bs.Alert bsStyle="danger">
					<h4>Frak!</h4>
					<p>
						{"A server error has occured!" + this.props.serverFail.getIn(['details', 'messege'])}
					</p>
				</Bs.Alert>
				</Bs.Col>
				</Bs.Row>
			);
		}
		if (this.props.user.get('isAdmin')) {
			return (
				<AdminToolbox
					tool="add"
					handleClick={this.createQuestion}
				/>
			);
		}
		return <div />;
	}
	,
	createQuestion: function (type) {
		this.props.createQuestion(type);
	}
})
