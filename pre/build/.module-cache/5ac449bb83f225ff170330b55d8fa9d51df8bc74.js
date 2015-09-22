var React = require('react');
var Achievements = require('./Achievements');

var Contestant = React.createClass({displayName: "Contestant",
	render: function () {
		return (
			React.createElement("div", {className: "row"}, 
				React.createElement("div", {className: "col-xs-12"}, 
					React.createElement("div", {className: "thumbnail"}, 
						React.createElement("img", {src: "/images/" + this.props.name + ".png", alt: this.props.name}), 
						React.createElement("div", {className: "caption"}, 
							React.createElement("h3", null, this.props.name), 
							React.createElement(Achievements, {
							contestantName: this.props.name, 
							marked: this.props.achievements, 
							isAdmin: this.props.isAdmin, 
							toggleAchievement: this.toggleAchievement}
							)
						)
					)
				)
			)
		);
	}
	,
	toggleAchievement: function (achievementCode) {
		var p = this.props;
		if (p.isAdmin) p.toggleAchievement(achievementCode, p.contestant);
	}
});

module.exports = Contestant;
