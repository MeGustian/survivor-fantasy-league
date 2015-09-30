var React = require('react');
var Bs = require('react-bootstrap');

var AnswerTypes = {};

AnswerTypes.Contestants = React.createClass({displayName: "Contestants",
	shouldComponentUpdate: function (nextProps) {
		var equal = I.is(this.props.details, nextProps.details);
		if (equal) {
			console.log('found equal');
			console.log(this);
		}
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
					React.createElement(Bs.OverlayTrigger, {placement: "top", overlay: tooltip, key: id}, 
						React.createElement(Bs.Thumbnail, {
							onClick: that.choose.bind(that, (correct ? null : id)), 
							src: "/images/contestants/" + name + ".jpg", 
							alt: name, 
							style: {border: (correct ? "3px solid green" : ""), width: '80px', height: '80px', marginRight: '20px', marginLeft: '5px'}}
						)
					)
				);
			});
	}
	,
	choose: function (id) {
		this.props.changeAnswer(id);
	}
});

module.exports = AnswerTypes;
