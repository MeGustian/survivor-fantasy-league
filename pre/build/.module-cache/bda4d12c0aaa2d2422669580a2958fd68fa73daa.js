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
			React.createElement("div", {style: style}, 
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
				var correct = id === that.props.answer;
				return (
					React.createElement(MyThumbnail, {key: id, id: id, selected: correct, name: name, changeAnswer: that.props.changeAnswer})
				);
			});
	}
});

module.exports = AnswerTypes;
