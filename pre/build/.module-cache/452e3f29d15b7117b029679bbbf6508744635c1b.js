var React = require('react');
var Bs = require('react-bootstrap');
var AdminToolbox = require('./AdminToolbox');
var AnswerTypes = require('./AnswerTypes');

module.exports = React.createClass({displayName: "exports",
	render: function () {
		return (
			React.createElement(Bs.Row, null, 
				React.createElement(Bs.Col, {xs: 12, sm: 10, smOffset: 1, md: 8, mdOffset: 2}, 
					React.createElement(Bs.Accordion, null, 
						this.questions()
					)

				)
			)
		);
	}
	,
	questions: function () {
		var p = this.props;
		return p.questions.filter(function (details, id) {
			return (id !== 'removed') && !details.get('removed');
		}).map(function (details, id) {
			return (
				React.createElement(Bs.Panel, {header: "some q?", eventKey: id}, 
					React.createElement(Question, {
						key: id, 
						questionId: id, 
						details: details, 
						tribes: p.contestants, 
						user: p.user, 
						handlers: p.dispatcher}
					)
				)
			);
		});
	}
});

var Question = React.createClass({displayName: "Question",
	render: function () {
		React.createElement("div", null, "some a")
	}
});
