var React = require('react');
var Bs = require('react-bootstrap');
var AdminToolbox = require('./AdminToolbox');
var AnswerTypes = require('./AnswerTypes');
var I = require('immutable');

var now;

module.exports = Quiz = React.createClass({displayName: "Quiz",
	componentWillUpdate: function () {
		now = Date.now();
	}
	,
	componentDidUpdate: function (prevProps, prevState) {
		console.log('Rendering `Quiz` took: ' + (Date.now() - now) + 'ms.');
	}
	,
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
		return p.questions
			.filter(function (details, id) {
				return (id !== 'removed') && !details.get('removed');
			})
			.map(function (details, id) {
				return (
					React.createElement(Question, {
						key: id, 
						questionId: id, 
						details: details, 
						tribes: p.contestants, 
						user: p.user, 
						handlers: p.dispatcher}
					)
				);
			})
			.toArray();
	}
});

var Question = React.createClass({displayName: "Question",
	shouldComponentUpdate: function (nextProps) {
		return this.props.details === nextProps.details;
	}
	,
	getInitialState: function () {
		// State represents the editing mode.
		return this.props.details.toJS();
	}
	,
	render: function () {
		var stylePanelHeadingInner = {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center'
		};
		return (
			React.createElement(Bs.Panel, {eventKey: this.props.id, header: 
				React.createElement("div", {style: stylePanelHeadingInner}, 
					this.questionRender(), 
					this.tools()
				)
			}, 
					this.bodyRender()
			)
		);
	}
	,
	questionRender: function () {
		var details = this.props.details;
		var style = {
			flexGrow: '1',
			flexShrink: '1',
			marginRight: '10px'
		}
		if (!details.get('isEditing')) {
			return React.createElement("h3", {className: "panel-title", style: style}, details.get('question'));
		} else {
			return (
				React.createElement("input", {
					type: "text", 
					className: "form-control", 
					placeholder: "question", 
					style: style, 
					value: this.state.question, 
					onChange: this.onText}
				)
			);
		}
	}
	,
	bodyRender: function () {
		var details = this.props.details;
		var isEditing = details.get('isEditing');
		var answer = isEditing ? this.state.answer : details.get('answer');
		// NOTE: Changing the type is supported, but not implemented here.
		switch (details.get('type')) {
			case 'boolean':
			var yes = answer ? " active" : "",
				no = !answer ? " active" : "";
			return (
				React.createElement(Bs.ButtonGroup, null, 
					React.createElement(Bs.Button, {bsStyle: "success", active: answer, onClick: this.changeAnswer.bind(this, true)}, "Yes"), 
					React.createElement(Bs.Button, {bsStyle: "danger", active: !answer, onClick: this.changeAnswer.bind(this, false)}, "No")
				)
			);
			case 'contestant':
			var nobody = !answer ? " active" : "";
			return (
				React.createElement(AnswerTypes.Contestants, {
					answer: answer, 
					tribes: this.props.tribes, 
					changeAnswer: this.changeAnswer}
				)
			);
			default:
			return React.createElement("div", null, "Bad type specified")
		}
	}
	,
	answerContestants: function () {
		var that = this;
		return this.props.tribes.map(function (contestant, id) {
			var name = contestant.get('firstName') + " " + contestant.get('lastName');
			return (
				React.createElement("li", {onClick: that.changeAnswer.bind(that, contestant.get('name'))}, React.createElement("a", null, 
					React.createElement("img", {style: {marginRight: '0.25em', width: '40px', height: '40px'}, src: "/images/contestants/" + name + ".jpg", alt: name}), 
					name
				))
			);
		});
	}
	,
	tools: function () {
		var handlers = this.props.handlers;
		var questionId = this.props.questionId;
		var isAdmin = this.props.user.get('isAdmin');
		var isEditing = this.props.details.get('isEditing');
		var style = {
			flexGrow: '0',
			flexShrink: '0',
			alignSelf: 'flex-start'
		}
		if (!isAdmin) {
			return;
		}
		return (
			React.createElement("div", {className: "btn-group", role: "group", "aria-label": "...", style: style}, 
				React.createElement(AdminToolbox, {
					tool: isEditing ? "discard" : "edit", 
					handleClick: handlers.edit.bind(null, questionId, !!isEditing)}
				), 
				React.createElement(AdminToolbox, {
					tool: isEditing ? "approve" : "remove", 
					handleClick: isEditing ? handlers.update.bind(null, questionId, this.state.question, this.state.answer, this.state.type) : handlers.remove.bind(null, questionId)}
				)
			)
		);
	}
	,
	onText: function (e) {
		this.setState({question: e.target.value});
	}
	,
	changeAnswer: function (answer, e) {
		var handlers = this.props.handlers;
		var questionId = this.props.questionId;
		var isAdmin = this.props.user.get('isAdmin');
		var isEditing = this.props.details.get('isEditing');
		var adminEdit = isAdmin && isEditing;
		var userEdit = !isAdmin;
		if (adminEdit) this.setState({answer: answer});
		if (userEdit) handlers.userAnswer(questionId, answer);
	}
});
