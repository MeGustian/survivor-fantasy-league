var React = require('react');
var ContestantObj = require('../objects/Contestant');
var Achievements = require('./Achievements');

var Contestant = React.createClass({displayName: "Contestant",
	render: function () {
		var me = new ContestantObj(this.props.key);
		return (
			React.createElement("div", {className: "tribe-mate"}, 
				React.createElement("h3", {className: "tribe-mate-name"}, 
					me.getName()
				), 
				React.createElement("div", {className: "tribe-mate-image"}, 
					React.createElement("img", {src: "/images/" + me.getName() + ".png", alt: "INSERT IMAGE"})
				), 
				React.createElement("div", {className: "tribe-mate-achievements"}, 
					React.createElement(Achievements, {
						contestantName: me.getName(), 
						marked: this.props.achievements, 
						toggleAchievement: this.toggleAchievement}
					)
				)
			)
		);
	}
	,
	toggleAchievement: function (achievementCode) {
		var id = this.props.key;
		this.props.toggleAchievement(achievementCode, id);
	}
});

module.exports = Contestant;
