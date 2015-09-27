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
					React.createElement(MyThumbnail, {key: id, id: id, tooltip: tooltip, correct: correct, name: name})
				);
			});
	}
	,
	choose: function (id) {
		this.props.changeAnswer(id);
	}
});

var MyThumbnail = React.createClass({displayName: "MyThumbnail",
	render: function () {
		var p = this.props;
		React.createElement(Bs.OverlayTrigger, {placement: "top", overlay: p.tooltip, key: p.id}, 
			React.createElement(Bs.Thumbnail, {
				onClick: that.choose.bind(that, (p.correct ? null : p.id)), 
				src: "/images/contestants/" + p.name + ".jpg", 
				alt: p.name, 
				style: {border: (p.correct ? "3px solid green" : ""), width: '80px', height: '80px', marginRight: '20px', marginLeft: '5px'}}
			)
		)
	}
});

module.exports = AnswerTypes;