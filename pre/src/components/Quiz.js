var React = require('react/addons');
var Bs = require('react-bootstrap');
var AdminToolbox = require('./AdminToolbox');
var AnswerTypes = require('./AnswerTypes');
var Contestants = AnswerTypes.Contestants;
var Num = AnswerTypes.Num;

var now;
function mod(n, m) {
	return ((n % m) + m) % m;
}

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
		console.info('Quiz');
		return (
			<Bs.Row>
				<Bs.Col xs={12} sm={10} smOffset={1} md={8} mdOffset={2}>
					<Bs.Pager>
						<Bs.PageItem onClick={this.changeQuestion.bind(this, -1)}>Previous</Bs.PageItem>
						<Bs.PageItem onClick={this.changeQuestion.bind(this, +1)}>Next</Bs.PageItem>
					</Bs.Pager>
					{this.questions()}
				</Bs.Col>
			</Bs.Row>
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
						<div style={{display: count === selected ? 'initial' : 'none'}}>
						<Question
							key={id}
							questionId={id}
							details={details}
							contestants={p.contestants.filter(function (contestant) {
								return contestant.getIn(['weeks', p.weekNumber, 'tribe']);
							})}
							user={p.user}
							open={p.open}
							handlers={p.dispatcher}
						/>
						</div>
					);
				})
				.toJS()
		);
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
					{/*this.tools()*/}
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
				<div style={{display: 'flex', justifyContent: 'space-around'}}>
				<Bs.ButtonGroup>
					<Bs.Button bsStyle="success" active={answer} onClick={this.changeAnswer.bind(this, true)} disabled={!this.props.open}>Yes</Bs.Button>
					<Bs.Button bsStyle="danger" active={!answer} onClick={this.changeAnswer.bind(this, false)} disabled={!this.props.open}>No</Bs.Button>
				</Bs.ButtonGroup>
				</div>
			);
			case 'contestant':
			return (
				<Contestants
					answer={answer}
					disabled={!this.props.open}
					contestants={this.props.contestants}
					changeAnswer={this.changeAnswer}
				/>
			);
			case 'number':
			return (
				<Num
					answer={answer}
					disabled={!this.props.open}
					changeAnswer={this.changeAnswer}
				/>
			);
			default:
			return <div>Bad type specified</div>
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
