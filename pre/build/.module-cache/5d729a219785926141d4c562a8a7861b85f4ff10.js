var React = require('react');
var Bs = require('react-bootstrap');
var I = require('immutable');

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
				var tooltip = React.createElement(Bs.Tooltip, null, name);
				var correct = id === that.props.answer;
				return (
					React.createElement("div", null, "yo")
				);
			});
	}
	,
	choose: function (id) {
		this.props.changeAnswer(id);
	}
});

module.exports = AnswerTypes;
