var React = require('react');
var Bs = require('react-bootstrap');
var AdminToolbox = require('./AdminToolbox');

module.exports = React.createClass({
	render: function () {
		if (this.props.serverFail) {
			return (
				<Bs.Alert bsStyle="danger">
					{"An error has occured. Data may have not been saved!"}
				</Bs.Alert>
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
