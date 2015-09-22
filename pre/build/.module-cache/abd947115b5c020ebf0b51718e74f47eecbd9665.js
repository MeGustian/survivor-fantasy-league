var React = require('react');
var AchievementsObj = require('../objects/Achievements');

var Achievements = React.createClass({displayName: "Achievements",
	render: function () {
		return (
			React.createElement("div", {className: "col-xs-8"}, 
			React.createElement("div", {className: "col-xs-6"}, 
				React.createElement("div", {className: "panel panel-success"}, 
					React.createElement("div", {className: "panel-heading"}, "Good achievements"), 
					React.createElement("div", {className: "panel-body"}, 
						React.createElement("p", null, "Listed below are ", this.props.contestantName+'\'s', " good achievments.")
					), 
					React.createElement("ul", {className: "list-group"}, 
						this.items('good')
					)
				)
			), 
			React.createElement("div", {className: "col-xs-6"}, 
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
		var marked = this.props.marked.filter(function (hasAchieved) {
			return hasAchieved;
		}).keySeq();
		var relevant = AchievementsObj.filter(function (theAchievement) {
			return theAchievement.get('alignment') === alignment;
		});
		return relevant
			.filter(function (theAchievement, achievementCode) {
				var isAdmin = that.props.isAdmin;
				var hasAchieved = !(marked.indexOf(achievementCode)<0);
				return isAdmin || hasAchieved;
			})
			.map(function (theAchievement, achievementCode) {
				var labelType;
				var hasAchieved = marked.indexOf(achievementCode)<0;
				if (hasAchieved) {
					labelType = 'default';
					labelGlyph = 'remove-sign';
				} else {
					labelType = alignmentToLabelType[alignment];
					labelGlyph = 'ok-sign';
				}
				return (
					React.createElement("li", {className: "list-group-item"}, 
						React.createElement("span", {
							className: "pull-right label label-" + labelType, 
							onClick: that.toggleAchievement.bind(that, achievementCode), 
							style: {fontFamily: 'monospace'}
						}, 
							React.createElement("span", {className: "glyphicon glyphicon-" + labelGlyph})
						), 
						React.createElement("span", {style: {marginRight: '1em'}}, 
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
