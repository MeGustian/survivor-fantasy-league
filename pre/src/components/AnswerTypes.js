var React = require('react/addons');
var Bs = require('react-bootstrap');
var I = require('immutable');
var MyThumbnail = require('./MyThumbnail');

var AnswerTypes = {};

AnswerTypes.Contestants = React.createClass({
	shouldComponentUpdate: function (nextProps) {
		var equal = this.props.answer === nextProps.answer;
		return !equal;
	}
	,
	render: function () {
		var style = {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'flex-start',
			flexWrap: 'wrap',
			alignItems: 'flex-basis'
		};
		return (
			<div style={{margin: 'auto'}}>
				{this.thumbnails()}
			</div>
		);
	}
	,
	thumbnails: function () {
		var that = this;
		return React.addons.createFragment(
			that.props.contestants
				.map(function (contestant, id) {
					var name = contestant.get('firstName') + " " + contestant.get('lastName');
					var isAnswer = id === that.props.answer;
					return (
						<MyThumbnail key={id} id={id} selected={isAnswer} name={name} choose={that.changeAnswer.bind(that, isAnswer)} />
					);
				}).toJS()
		);
	}
	,
	changeAnswer: function (alreadySelected, id) {
		if (!this.props.disabled) {
			this.props.changeAnswer(alreadySelected ? null : id);
		}
	}
});

AnswerTypes.Num = React.createClass({
	shouldComponentUpdate: function (nextProps) {
		var equal = this.props.answer === nextProps.answer;
		return !equal;
	}
	,
	render: function () {
		var answer = this.props.answer > 0 ? this.props.answer : 0;
		return (
			<div style={{display: 'flex', justifyContent: 'space-around'}}>
				<input disabled={this.props.disabled} type="range" value={answer.toString()} min="0" max="13" step="1" onChange={this.changeAnswer}
				style={{maxWidth: '300px'}} />
				<Bs.Badge pullRight>{answer.toString()}</Bs.Badge>
			</div>
		);
	}
	,
	changeAnswer: function (event) {
		this.props.changeAnswer(event.target.value);
	}
});

module.exports = AnswerTypes;
