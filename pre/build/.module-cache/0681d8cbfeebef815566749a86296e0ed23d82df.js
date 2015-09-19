var React = require('react');
var AchievementsObj = require('../objects/Achievements');

var Achievements = React.createClass({displayName: "Achievements",
	render: function () {
		return (
			React.createElement("div", {className: "panel panel-success"}, 
				React.createElement("div", {className: "panel-heading"}, "Panel heading"), 
				React.createElement("div", {className: "panel-body"}, 
					React.createElement("p", null, "...")
				), 

				React.createElement("ul", {className: "list-group"}, 
					React.createElement("li", {className: "list-group-item"}, "Cras justo odio"), 
					React.createElement("li", {className: "list-group-item"}, "Dapibus ac facilisis in"), 
					React.createElement("li", {className: "list-group-item"}, "Morbi leo risus"), 
					React.createElement("li", {className: "list-group-item"}, "Porta ac consectetur ac"), 
					React.createElement("li", {className: "list-group-item"}, "Vestibulum at eros")
				)
			)
		);
	}
	,
	items: function () {
		var marked = this.props.marked.filter(function (isAchieved) {
			return isAchieved;
		});
		var relevant = AchievementsObj.filter(function (theAchievement) {
			return theAchievement.alignment == 'good';
		})
		return this.props.marked.filter(function (isAchieved, theAchievement) {
			return
		})
	}
});

module.exports = Achievements;
