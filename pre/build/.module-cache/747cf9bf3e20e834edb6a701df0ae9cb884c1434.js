var React = require('react');
var Bs = require('react-bootstrap');

module.exports = React.createClass({displayName: "exports",
	render: function () {
		if (this.props.has) {
			return React.createElement(Alert, {bsStyle: "danger"})
		} else {
			return;
		}
	}
})
