var React = require('react/addons');
var PropTypes = React.PropTypes;
var ImmutablePropTypes = require('react-immutable-proptypes');
var Bs = require('react-bootstrap');

var Weekly = React.createClass({displayName: "Weekly",
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
			React.createElement("div", null, 
				React.createElement(Bs.PageHeader, null, "Week #" + this.props.selectedWeek), 
				this.welcome()
			)
		);
	}
	,
	welcome: function () {
		if (this.state.welcome) {
			return (
				React.createElement(Bs.Alert, {bsStyle: "info", onDismiss: this.handleDismiss}, 
					"Welcome to the weekly page. Here you can answer questions (as long as you do at least a day before air date), and check how the contestants are doing."
				)
			);
		} else {
			return React.createElement("div", null);
		}
	}
	,
	handleDismiss: function () {
		this.setState({welcome: false});
	}
});

module.exports = Weekly;
