var React = require('react');
var AdminToolbox = require('./AdminToolbox');
var AnswerTypes = require('./AnswerTypes');

var Questions = React.createClass({displayName: "Questions",
	render: function () {
		// var style = {
		// 	display: 'flex',
		// 	flexDirection: 'row',
		// 	justifyContent: 'space-around',
		// 	alignItems: 'flex-basis'
		// };
		return (
			React.createElement("div", {className: "row"}, 
				this.newQuestion(), 
				this.questions()
			)
		);
	}
	,
	newQuestion: function () {
		var isAdmin = this.props.user.get('isAdmin');
		if (!isAdmin) {
			return;
		}
		return (
			React.createElement(AdminToolbox, {
				tool: "add", 
				handleClick: this.create}
			)
		);
	}
	,
	create: function (type) {
		this.props.dispatcher.create(type);
	}
	,
	questions: function () {
		var p = this.props;
		return p.questions.filter(function (details, id) {
			return (id !== 'removed') && !details.get('removed');
		}).map(function (details, id) {
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
		// var styleQuestion = {
		// 	width: '40%'
		// };
		var stylePanelHeadingInner = {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center'
		};
		return (
			React.createElement("div", {className: "col-xs-6 col-md-3"}, 
				React.createElement("div", {className: "panel panel-default"}, 
					React.createElement("div", {className: "panel-heading"}, 
						React.createElement("div", {style: stylePanelHeadingInner}, 
							this.questionRender(), 
							this.tools()
						)
					), 
					React.createElement("div", {className: "panel-body center-block"}, 
						this.bodyRender()
					)
				)
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
				React.createElement("div", {className: "btn-group btn-group-lg", role: "group"}, 
					React.createElement("button", {type: "button", className: "btn btn-success" + yes, onClick: this.changeAnswer.bind(this, true)}, "Yes"), 
					React.createElement("button", {type: "button", className: "btn btn-danger" + no, onClick: this.changeAnswer.bind(this, false)}, "No")
				)
			);
			case 'contestant':
			var nobody = !answer ? " active" : "";
			return (
				React.createElement(AnswerTypes.Contestants, {
				tribes: this.props.tribes, 
				changeAnswer: this.changeAnswer}
			)
			);
			// return (
			// 	<div className="btn-group btn-group-lg" role="group">
			// 		<button
			// 			type="button"
			// 			className={"btn btn-default" + nobody}
			// 			onClick={this.changeAnswer.bind(this, null)}
			// 		>
			// 			<span className="glyphicon glyphicon-remove" />
			// 		</button>
			// 		<button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			// 			{(answer || "Nobody") + " "}
			// 			<span className="caret"></span>
			// 		</button>
			// 		<ul className="dropdown-menu">
			// 			{this.answerContestants()}
			// 		</ul>
			// 	</div>
			// );
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

module.exports = Questions;
