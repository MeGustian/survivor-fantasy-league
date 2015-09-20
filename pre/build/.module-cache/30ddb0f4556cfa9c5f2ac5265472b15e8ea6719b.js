var React = require('react');
var AchievementsObj = require('../objects/Achievements');

var Achievements = React.createClass({displayName: "Achievements",
	render: function () {
		return (
			React.createElement("div", null, 
				React.createElement("div", {className: "panel panel-success"}, 
					React.createElement("div", {className: "panel-heading"}, "Good achievements"), 
					React.createElement("div", {className: "panel-body"}, 
						React.createElement("p", null, "Listed below are ", this.props.contestantName+'\'s', " good achievments.")
					), 
					React.createElement("ul", {className: "list-group"}, 
						this.items('good')
					)
				), 
				React.createElement("div", {className: "panel panel-danger"}, 
					React.createElement("div", {className: "panel-heading"}, "Bad achievements"), 
					React.createElement("div", {className: "panel-body"}, 
						React.createElement("p", null, "Listed below are ", this.props.contestantName+'\'s', " bad achievments.")
					), 
					React.createElement("ul", {className: "list-group"}, 
						this.items('bad')
					)
				)
			)
		);
	}
	,
	items: function (alignment) {
		var that = this;
		var alignmentToLabelType = {
			good: 'success',
			bad: 'danger'
		};
		var marked = this.props.marked.filter(function (isAchieved) {
			return isAchieved;
		}).keySeq();
		var relevant = AchievementsObj.filter(function (theAchievement) {
			return theAchievement.get('alignment') === alignment;
		});
		return relevant.map(function (theAchievement, achievementCode) {
			var labelType;
			if (marked.indexOf(achievementCode)<0) {
				labelType = 'default';
				labelText = 'No ';
			} else {
				labelType = alignmentToLabelType[alignment];
				labelText = 'Yes';
			}
			return (
				React.createElement("li", {className: "list-group-item"}, 
					React.createElement("span", {
						className: "label label-" + labelType, 
						onClick: that.toggleAchievement.bind(that, achievementCode), 
						style: {fontFamily: 'monospace'}
					}, 
						labelText
					), 
					React.createElement("span", {style: {marginLeft: '1em'}}, 
						theAchievement.get('text')
					)
				)
			);
		})
	}
	,
	toggleAchievement: function (achievementCode) {
		this.props.toggleAchievement(achievementCode);
	}
});

module.exports = Achievements;
