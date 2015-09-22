var React = require('react');
var ContestantObj = require('../objects/Contestant');
var Achievements = require('./Achievements');

var Contestant = React.createClass({displayName: "Contestant",
	render: function () {
		var me = new ContestantObj(this.props.contestant);
		return (
			React.createElement("div", {className: "tribe-mate"}, 
				React.createElement("h3", {className: "tribe-mate-name"}, 
					this.props.name
				), 
				React.createElement("img", {src: "/images/" + this.props.name + ".png", alt: "INSERT IMAGE"}), 
				React.createElement(Achievements, {
					contestantName: this.props.name, 
					marked: this.props.achievements, 
					isAdmin: this.props.isAdmin, 
					toggleAchievement: this.toggleAchievement}
				), "\\"
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
