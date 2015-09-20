var React = require('react');
var AdminToolbox = require('./AdminToolbox');

var Questions = React.createClass({displayName: "Questions",
	render: function () {
		var style = {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'flex-start',
			alignItems: 'center'
		};
		return (
			React.createElement("div", {className: "questions-container", style: style}, 
				this.questions()
			)
		);
	}
	,
	questions: function () {
		var p = this.props;
		return p.questions.map(function (details, id) {
			return (
				React.createElement(Question, {
					key: id, 
					questionId: id, 
					details: details, 
					user: p.user, 
					handlers: p.dispatcher}
				)
			);
		});
	}
});

var Question = React.createClass({displayName: "Question",
	render: function () {
		var style = {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-around',
			alignItems: 'baseline'
		};
		return (
			React.createElement("div", {className: "question", style: style}, 
				React.createElement("div", {className: "panel panel-default"}, 
					React.createElement("div", {className: "panel-heading"}, 
						this.props.details.get('question'), 
						this.tools()
					), 
					React.createElement("div", {className: "panel-body"}, 
						this.bodyRender()
					)
				)
			)
		);
	}
	,
	bodyRender: function () {
		var type = this.props.details.get('type');
		var isAdmin = this.props.user.get('isAdmin');
		switch (type) {
			case 'boolean':
				var yes = this.props.details.get('answer') ? " active" : "";
				var no = !this.props.details.get('answer') ? " active" : "";
				return (
					React.createElement("div", {className: "btn-group btn-group-lg", role: "group"}, 
						React.createElement("button", {type: "button", className: "btn btn-success" + yes}, "Yes"), 
						React.createElement("button", {type: "button", className: "btn btn-danger" + no}, "No")
					)
				);
			case 'contestant':
				return (
					React.createElement("div", {className: "btn-group btn-group-lg", role: "group"}, 
						React.createElement("button", {type: "button", className: "btn btn-default"}, "Nobody"), 
						React.createElement("button", {type: "button", className: "btn btn-default dropdown-toggle", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false"}, 
							"Somebody", 
							React.createElement("span", {className: "caret"})
						), 
						React.createElement("ul", {className: "dropdown-menu"}, 
							this.answerContestants()
						)
					)
				)
			default:
				return React.createElement("div", null, "Bad type specified")
		}
	}
	,
	answerContestants: function () {
		// return this.props.tribes.map

		return React.createElement("li", null, React.createElement("a", null, "1"))
	}
	,
	tools: function () {
		var handlers = this.props.handlers;
		var details = this.props.details;
		var questionId = this.props.questionId;
		if (!details.get('isEditing')) {
			return (
				React.createElement("div", {className: "toolbox-container"}, 
					React.createElement(AdminToolbox, {
						tool: "edit", 
						handleClick: handlers.edit.bind(null, questionId, details.isEditing)}
					), 
					React.createElement(AdminToolbox, {
						tool: "remove", 
						handleClick: handlers.remove.bind(null, questionId)}
					)
				)
			);
		} else {
			return (
				React.createElement("div", {className: "toolbox-container"}, 
				React.createElement(AdminToolbox, {
					tool: "discard", 
					handleClick: handlers.edit.bind(null, questionId, details.isEditing)}
				), 
				React.createElement(AdminToolbox, {
					tool: "approve", 
					handleClick: handlers.update.bind(null, questionId, details.question, details.answer, details.type)}
				)
				)
			);
		}
	}
});

module.exports = Questions;
