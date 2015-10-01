var React = require('react/addons');
var Bs = require('react-bootstrap');
var AdminToolbox = require('./AdminToolbox');
var AnswerTypes = require('./AnswerTypes');
var Contestants = AnswerTypes.Contestants;
var Tribes = AnswerTypes.Tribes;
var Num = AnswerTypes.Num;

var now;
function mod(n, m) {
	return ((n % m) + m) % m;
}

var Quiz = React.createClass({displayName: "Quiz",
	componentWillUpdate: function () {
		now = Date.now();
	}
	,
	componentDidUpdate: function (prevProps, prevState) {
		console.log('Rendering `Quiz` took: ' + (Date.now() - now) + 'ms.');
	}
	,
	render: function () {
		console.info('Quiz');
		return (
			React.createElement(Bs.Row, null, 
				React.createElement(Bs.Col, {xs: 12, sm: 10, smOffset: 1, md: 8, mdOffset: 2}, 
					React.createElement(Bs.Pager, null, 
						React.createElement(Bs.PageItem, {onClick: this.changeQuestion.bind(this, -1)}, "Previous"), 
						React.createElement(Bs.PageItem, {onClick: this.changeQuestion.bind(this, +1)}, "Next")
					), 
					this.questions()
				)
			)
		);
	}
	,
	changeQuestion: function (inc) {
		this.props.dispatcher.switchQuestion(inc);
	}
	,
	questions: function () {
		var p = this.props;
		var selected = mod(p.selected, p.questions.size);
		var count = -1;
		return React.addons.createFragment(
			p.questions
				.filter(function (details, id) {
					return (id !== 'removed') && !details.get('removed');
				})
				.map(function (details, id) {
					count++;
					return (
						React.createElement("div", {style: {display: count === selected ? 'initial' : 'none'}}, 
						React.createElement(Question, {
							key: id, 
							questionId: id, 
							numbering: {is: mod(p.selected, p.questions.size)+1, of: p.questions.size}, 
							details: details, 
							contestants: p.contestants.filter(function (contestant) {
								return contestant.getIn(['weeks', p.weekNumber, 'tribe']);
							}), 
							tribes: require('../helpers/tribe-grouping')(p.weekNumber, p.contestants), 
							user: p.user, 
							open: p.open, 
							handlers: p.dispatcher}
						)
						)
					);
				})
				.toJS()
		);
	}
});

var Question = React.createClass({displayName: "Question",
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
		var stylePanelFooterInner = {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center'
		};
		return (
			React.createElement(Bs.Panel, {eventKey: this.props.id, header: 
				React.createElement("div", {style: stylePanelHeadingInner}, 
					this.questionRender(), 
					/*this.tools()*/
					React.createElement("div", {className: "badge pull-right"}, 
					this.props.numbering.is + " / " + this.props.numbering.of
					)
				), 
			footer: React.createElement("div", {style: stylePanelFooterInner}, this.footerRender())}, 
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
				React.createElement("div", {style: {display: 'flex', justifyContent: 'space-around'}}, 
					React.createElement(Bs.Button, {bsStyle: "success", active: answer, onClick: this.changeAnswer.bind(this, true), disabled: !this.props.open}, "Yes"), 
					React.createElement(Bs.Button, {bsStyle: "danger", active: !answer, onClick: this.changeAnswer.bind(this, false), disabled: !this.props.open}, "No")
				)
			);
			case 'contestant':
			return (
				React.createElement(Contestants, {
					answer: answer, 
					disabled: !this.props.open, 
					contestants: this.props.contestants, 
					changeAnswer: this.changeAnswer}
				)
			);
			case 'tribes':
			return (
				React.createElement(Tribes, {
					answer: answer, 
					disabled: !this.props.open, 
					tribes: this.props.tribes, 
					changeAnswer: this.changeAnswer}
				)
			);
			case 'number':
			return (
				React.createElement(Num, {
					answer: answer, 
					disabled: !this.props.open, 
					changeAnswer: this.changeAnswer}
				)
			);
			default:
			return React.createElement("div", null, "Bad type specified")
		}
	}
	,
	footerRender: function () {
		var details = this.props.details;
		var answer = details.get('answer');
		switch (details.get('type')) {
			case 'boolean':
			if (typeof answer !== 'boolean') {
				return false;
			}
			if (answer) {
				return React.createElement("div", null, "You answered ", React.createElement("strong", null, "Yes"));
			} else {
				return React.createElement("div", null, "You answered ", React.createElement("strong", null, "No"));
			}
			case 'contestant':
			if (answer) {
				var contestant = this.props.contestants.get(answer);
				return React.createElement("div", null, "You answered ", React.createElement("strong", null, contestant.get('firstName') + " " + contestant.get('lastName')));
			}
			return false;
			case 'number':
			if (typeof answer !== 'number') {
				return false;
			}
			if (answer) {
				return React.createElement("div", null, "You answered ", React.createElement("strong", null, answer));
			} else {
				return false;
			}
			default:
			return false;
		}
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

module.exports = Quiz;
