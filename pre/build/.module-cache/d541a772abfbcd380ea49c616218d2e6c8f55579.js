var React = require('react');
var Bs = require('react-bootstrap');

var AnswerTypes = {};

AnswerTypes.Contestants = React.createClass({displayName: "Contestants",
	render: function () {
		return (
			React.createElement("div", {className: "row"}, 
				this.thumbnails()
			)
		);
	}
	,
	thumbnails: function () {
		var that = this;
		return this.props.tribes.map(function (contestant, id) {
			var name = contestant.get('firstName') + " " + contestant.get('lastName');
			var tooltip = React.createElement(Bs.Tooltip, null, "name");
			return (
				React.createElement("div", {className: "col-xs-4 col-md-3", key: id}, 
					React.createElement(Bs.OverlayTrigger, {placement: "left", overlay: tooltip}, 
					React.createElement("a", {className: "thumbnail"}, 
						React.createElement("img", {
							style: {marginRight: '0.25em', width: '40px', height: '40px'}, 
							src: "/images/contestants/" + name + ".jpg", 
							alt: name}
						), 
						name
					)
					)
				)
			);
		});
	}
});

module.exports = AnswerTypes;
