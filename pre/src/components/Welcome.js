var React = require('react/addons');
var PropTypes = React.PropTypes;
var ImmutablePropTypes = require('react-immutable-proptypes');
var Bs = require('react-bootstrap');

var Weekly = React.createClass({
	propTypes: {

	}
	,
	getInitialState: function () {
		return {
			welcome: true
		};
	}
	,
	render: function () {
		return (
			<div>
				<Bs.PageHeader>{"Week #" + this.props.selectedWeek}</Bs.PageHeader>
				{this.welcome()}
			</div>
		);
	}
	,
	welcome: function () {
		if (this.state.welcome) {
			return (
				<Bs.Alert bsStyle="info" onDismiss={this.handleDismiss}>
					{"Welcome to the weekly page. Here you can answer questions (as long as you do at least a day before air date), and check how the contestants are doing."}
				</Bs.Alert>
			);
		} else {
			return <div />;
		}
	}
	,
	handleDismiss: function () {
		this.setState({welcome: false});
	}
});

module.exports = Weekly;
