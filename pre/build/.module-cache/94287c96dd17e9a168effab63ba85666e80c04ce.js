var React = require('react');
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
			React.createElement("div", null, 
				this.thumbnails()
			)
		);
	}
	,
	thumbnails: function () {
		var that = this;
		return this.props.tribes
			.map(function (contestant, id) {
				var name = contestant.get('firstName') + " " + contestant.get('lastName');
				var isAnswer = id === that.props.answer;
				return (
					React.createElement(MyThumbnail, {key: id, id: id, selected: isAnswer, name: name, choose: that.changeAnswer.bind(that, isAnswer)})
				);
			});
	}
	,
	changeAnswer: function (alreadySelected, id) {
		this.props.changeAnswer(alreadySelected ? null : id);
	}
});

module.exports = AnswerTypes;
