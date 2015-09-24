var React = require('react');
var Bs = require('react-bootstrap');

var AnswerTypes = {};

AnswerTypes.Contestants = React.createClass({displayName: "Contestants",
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
		return this.props.tribes.map(function (contestant, id) {
			var name = contestant.get('firstName') + " " + contestant.get('lastName');
			var tooltip = React.createElement(Bs.Tooltip, null, name);
			return (
				React.createElement(Bs.OverlayTrigger, {placement: "top", overlay: tooltip, key: id}, 
					React.createElement(Bs.Thumbnail, {
						src: "/images/contestants/" + name + ".jpg", 
						alt: name, 
						style: {width: '40px', height: '40px', marginRight: '20px', marginLeft: '5px'}}
					/)
				)
			);
		});
	}
});

module.exports = AnswerTypes;
