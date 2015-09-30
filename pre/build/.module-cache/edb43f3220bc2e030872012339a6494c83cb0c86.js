var React = require('react/addons');
var Bs = require('react-bootstrap');
var I = require('immutable');
var InputRange = require('react-input-range');
var MyThumbnail = require('./MyThumbnail');

var AnswerTypes = {};

AnswerTypes.Contestants = React.createClass({displayName: "Contestants",
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
			React.createElement("div", {style: {margin: 'auto'}}, 
				this.thumbnails()
			)
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
						React.createElement(MyThumbnail, {key: id, id: id, selected: isAnswer, name: name, choose: that.changeAnswer.bind(that, isAnswer)})
					);
				}).toJS()
		);
	}
	,
	changeAnswer: function (alreadySelected, id) {
		this.props.changeAnswer(alreadySelected ? null : id);
	}
});

AnswerTypes.Num = React.createClass({displayName: "Num",
	shouldComponentUpdate: function (nextProps) {
		var equal = this.props.answer === nextProps.answer;
		return !equal;
	}
	,
	render: function () {
		console.log(this.props.answer);
		return (
			React.createElement("div", {style: {textAlign: 'center'}}, 
				React.createElement("input", {type: "range", value: this.props.answer, max: 13, min: 0, step: 1})
			)
		);
	}
	,
	changeAnswer: function (e, selectedEvent) {
		this.props.changeAnswer(selectedEvent.eventKey);
	}
	,
	changeAnswerToNone: function () {
		this.props.changeAnswer(0);
	}
});

module.exports = AnswerTypes;
