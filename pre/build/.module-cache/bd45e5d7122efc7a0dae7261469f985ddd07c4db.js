var React = require('react/addons');
var Bs = require('react-bootstrap');
var I = require('immutable');
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
		return (
			React.createElement("div", null, 
			React.createElement(Bs.Button, {onClick: this.changeAnswer.bind(this, null, 0)}, "None"), 
			React.createElement(Bs.Pagination, {
				prev: true, 
				next: true, 
				ellipsis: true, 
				items: 20, 
				maxButtons: 5, 
				activePage: this.props.answer != 0 ? this.props.answer : -1, 
				onSelect: this.changeAnswer}
			)
			)
		);
	}
	,
	changeAnswer: function (e, selectedEvent) {
		this.props.changeAnswer(selectedEvent.eventKey);
	}
});

module.exports = AnswerTypes;
