var React = require('react');
var Bs = require('react-bootstrap');
var AdminToolbox = require('./AdminToolbox');
var AnswerTypes = require('./AnswerTypes');

module.exports = React.createClass({displayName: "exports",
	render: function () {
		return (
			React.createElement(Bs.Row, null, 
				React.createElement(Bs.Col, {xs: 12, sm: 10, smOffset: 1, md: 8, mdOffset: 2}, 
					React.createElement(Bs.Panel, {header: "some q?"}, 
						"some a"
					), 
					React.createElement(Bs.Pager, null, 
						React.createElement(Bs.PageItem, null, "Previous"), 
						React.createElement(Bs.PageItem, null, "Next")
					)
				)
			)
		);
	}
})
