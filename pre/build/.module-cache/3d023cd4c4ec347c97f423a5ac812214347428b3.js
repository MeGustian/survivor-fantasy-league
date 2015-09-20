var React = require('react');
var ContestantObj = require('../objects/Contestant');
var Achievements = require('./Achievements');

var Contestant = React.createClass({displayName: "Contestant",
	render: function () {
		var me = new ContestantObj(this.props.contestant);
		return (
			React.createElement("div", {className: "tribe-mate"}, 
				React.createElement("h3", {className: "tribe-mate-name"}, 
					me.getName()
				), 
				React.createElement("div", {className: "tribe-mate-image"}, 
					React.createElement("img", {src: "/images/" + me.getName() + ".png", alt: "INSERT IMAGE"})
				), 
				this.renderAchievements(me)
			)
		);
	}
	,
	renderAchievements: function (me) {
		if (typeof this.props.achievements === 'undefined') {
			return;
		}
		return (
			React.createElement("div", {className: "tribe-mate-achievements"}, 
				React.createElement(Achievements, {
					contestantName: me.getName(), 
					marked: this.props.achievements, 
					isAdmin: this.props.isAdmin, 
					toggleAchievement: this.toggleAchievement}
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
