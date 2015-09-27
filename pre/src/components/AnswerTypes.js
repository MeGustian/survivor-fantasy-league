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
			that.props.tribes
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
		this.props.changeAnswer(alreadySelected ? null : id);
	}
});

AnswerTypes.Num = React.createClass({
	shouldComponentUpdate: function (nextProps) {
		var equal = this.props.answer === nextProps.answer;
		return !equal;
	}
	,
	render: function () {
		return (
			<Bs.Pagination
				prev
				next
				ellipsis
				items={20}
				maxButtons={5}
				activePage={this.props.answer}
				onSelect={this.changeAnswer}
			/>
		);
	}
	,
	changeAnswer: function (e, selectedEvent) {
		this.props.changeAnswer(selectedEvent.eventKey);
	}
});

module.exports = AnswerTypes;
