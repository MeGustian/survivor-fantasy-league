var React = require('react');
var AdminToolbox = require('./AdminToolbox');
var AnswerTypes = require('./AnswerTypes');
var Bs = require('react-bootstrap');

module.exports = React.createClass({displayName: "exports",
	render: function () {
		return (
			React.createElement(Bs.Row, null, 
				React.createElement(Bs.Col, {xs: 12, sm: 10, smOffset: 1, md: 8, mdOffset: 2}, 
					React.createElement(Panel, null)
				)
			)

		)
	}
})
