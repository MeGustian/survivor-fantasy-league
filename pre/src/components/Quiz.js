var React = require('react');
var Bs = require('react-bootstrap');
var AdminToolbox = require('./AdminToolbox');
var AnswerTypes = require('./AnswerTypes');

var now;

var Quiz = React.createClass({
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
			<Bs.Row>
				<Bs.Col xs={12} sm={10} smOffset={1} md={8} mdOffset={2}>
					<Bs.Accordion>
						{this.questions()}
					</Bs.Accordion>
				</Bs.Col>
			</Bs.Row>
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
					<Question
						key={id}
						questionId={id}
						details={details}
						tribes={p.contestants}
						user={p.user}
						handlers={p.dispatcher}
					/>
				);
			})
			.toArray();
	}
});

var Question = React.createClass({
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
			<Bs.Panel eventKey={this.props.id} header={
				<div style={stylePanelHeadingInner}>
					{this.questionRender()}
					{this.tools()}
				</div>
			}>
					{this.bodyRender()}
			</Bs.Panel>
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
			return <h3 className="panel-title" style={style}>{details.get('question')}</h3>;
		} else {
			return (
				<input
					type="text"
					className="form-control"
					placeholder="question"
					style={style}
					value={this.state.question}
					onChange={this.onText}
				/>
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
				<Bs.ButtonGroup>
					<Bs.Button bsStyle="success" active={answer} onClick={this.changeAnswer.bind(this, true)}>Yes</Bs.Button>
					<Bs.Button bsStyle="danger" active={!answer} onClick={this.changeAnswer.bind(this, false)}>No</Bs.Button>
				</Bs.ButtonGroup>
			);
			case 'contestant':
			var nobody = !answer ? " active" : "";
			return (
				<AnswerTypes.Contestants
					answer={answer}
					tribes={this.props.tribes}
					changeAnswer={this.changeAnswer}
				/>
			);
			default:
			return <div>Bad type specified</div>
		}
	}
	,
	answerContestants: function () {
		var that = this;
		return this.props.tribes.map(function (contestant, id) {
			var name = contestant.get('firstName') + " " + contestant.get('lastName');
			return (
				<li onClick={that.changeAnswer.bind(that, contestant.get('name'))}><a>
					<img style={{marginRight: '0.25em', width: '40px', height: '40px'}} src={"/images/contestants/" + name + ".jpg"} alt={name} />
					{name}
				</a></li>
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
			<div className="btn-group" role="group" aria-label="..." style={style}>
				<AdminToolbox
					tool={isEditing ? "discard" : "edit"}
					handleClick={handlers.edit.bind(null, questionId, !!isEditing)}
				/>
				<AdminToolbox
					tool={isEditing ? "approve" : "remove"}
					handleClick={isEditing ? handlers.update.bind(null, questionId, this.state.question, this.state.answer, this.state.type) : handlers.remove.bind(null, questionId)}
				/>
			</div>
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
