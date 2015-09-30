var React = require('react');
var Bs = require('react-bootstrap');

module.exports = React.createClass({displayName: "exports",
	render: function () {
		if (this.props.has) {
			return (
				React.createElement(Bs.Alert, {bsStyle: "danger"}, 
					"An error has occured. Data may have not been saved!"
				)
			);
		} else {
			return React.createElement("div", null);
		}
	}
})
