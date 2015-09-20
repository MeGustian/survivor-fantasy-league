var React = require('react');
var AdminToolbox = require('./AdminToolbox');

var Questions = React.createClass({displayName: "Questions",
	render: function () {
		var style = {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-around',
			alignItems: 'flex-basis'
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
	getInitialState: function () {
		// State represents the editing mode.
		return this.props.details.toJS();
	}
	,
	render: function () {
		var style = {
			width: '40%'
		};
		return (
			React.createElement("div", {className: "question", style: style}, 
				React.createElement("div", {className: "panel panel-default"}, 
					React.createElement("div", {className: "panel-heading"}, 
						this.questionRender(), 
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
	questionRender: function () {
		var details = this.props.details;
		if (!details.get('isEditing')) {
			return React.createElement("span", null, details.get('question'));
		} else {
			return (
				React.createElement("div", {className: "input-group"}, 
					React.createElement("input", {
						type: "text", 
						className: "form-control", 
						placeholder: "question", 
						value: this.state.question, 
						onChange: this.onChange.bind(this, 'question')}
					)
				)
			);
		}
	}
	,
	bodyRender: function () {
		var isAdmin = this.props.user.get('isAdmin');
		var details = this.props.details;
		var isEditing = details.get('isEditing');
		var answer = isEditing ? this.state.answer : details.get('answer');
		// NOTE: Changing the type is supported, but not implemented here.
		switch (details.get('type')) {
			case 'boolean':
				var yes = answer ? " active" : "",
					no = !answer ? " active" : "";
				return (
					React.createElement("div", {className: "btn-group btn-group-lg", role: "group"}, 
						React.createElement("button", {type: "button", className: "btn btn-success" + yes, onClick: this.boolClick.bind(this, true)}, "Yes"), 
						React.createElement("button", {type: "button", className: "btn btn-danger" + no, onClick: this.boolClick.bind(this, false)}, "No")
					)
				);
			case 'contestant':
				var nobody = !answer ? " active" : "";
				return (
					React.createElement("div", {className: "btn-group btn-group-lg", role: "group"}, 
						React.createElement("button", {type: "button", className: "btn btn-default" + nobody}, "Nobody"), 
						React.createElement("button", {type: "button", className: "btn btn-default dropdown-toggle", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false"}, 
							answer, 
							React.createElement("span", {className: "caret"})
						), 
						React.createElement("ul", {className: "dropdown-menu"}, 
							this.answerContestants()
						)
					)
				);
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
		var questionId = this.props.questionId;
		var isAdmin = this.props.user.get('isAdmin');
		var isEditing = this.props.details.get('isEditing');
		if (!isAdmin) {
			return;
		}
		if (!isEditing) {
			return (
				React.createElement("span", {className: "toolbox-container pull-right"}, 
					React.createElement(AdminToolbox, {
						tool: "edit", 
						handleClick: handlers.edit.bind(null, questionId, isEditing)}
					), 
					React.createElement(AdminToolbox, {
						tool: "remove", 
						handleClick: handlers.remove.bind(null, questionId)}
					)
				)
			);
		} else {
			return (
				React.createElement("span", {className: "toolbox-container pull-right"}, 
					React.createElement(AdminToolbox, {
						tool: "discard", 
						handleClick: handlers.edit.bind(null, questionId, isEditing)}
					), 
					React.createElement(AdminToolbox, {
						tool: "approve", 
						handleClick: handlers.update.bind(null, questionId, this.state.question, this.state.answer, this.state.type)}
					)
				)
			);
		}
	}
	,
	onChange: function (field, e) {
		this.setState({question: e.target.value});
	}
	,
	boolClick: function (answer, e) {
		this.setState({answer: answer});
	}
});

module.exports = Questions;
