var React = require('react');
var AchievementsObj = require('../objects/Achievements');

var Achievements = React.createClass({displayName: "Achievements",
	render: function () {
		return (
			React.createElement("div", {className: "panel panel-success"}, 
				React.createElement("div", {className: "panel-heading"}, "Good achievements"), 
				React.createElement("div", {className: "panel-body"}, 
					React.createElement("p", null, "Listed below are ", this.props.contestantName+'\'s', " good achievments.")
				), 

				React.createElement("ul", {className: "list-group"}, 
					this.items('good')
				)
			)
		);
	}
	,
	items: function (alignment) {
		var marked = this.props.marked.filter(function (isAchieved) {
			console.log(isAchieved);
			return isAchieved;
		}).keySeq();
		var relevant = AchievementsObj.filter(function (theAchievement) {
			return theAchievement.get('alignment') === alignment;
		});
		return relevant.map(function (theAchievement, achievementCode) {
			var badge;
			if (marked.indexOf(achievementCode)<0) {
				badge = 0;
			} else {
				badge = 1;
			}
			return React.createElement("li", {className: "list-group-item"}, React.createElement("span", {className: "badge"}, badge), theAchievement.get('text'))
		})
	}
});

module.exports = Achievements;
