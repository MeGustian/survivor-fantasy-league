var React = require('react');
var AchievementsObj = require('../objects/Achievements');

var Achievements = React.createClass({displayName: "Achievements",
	render: function () {
		return (
			React.createElement("div", {className: "col-xs-8"}, 
			React.createElement("div", {className: "row"}, 
			React.createElement("div", {className: "col-xs-12 col-md-6"}, 
				React.createElement("div", {className: "panel panel-success"}, 
					React.createElement("div", {className: "panel-heading"}, "Good achievements"), 
					React.createElement("ul", {className: "list-group"}, 
						this.items('good')
					)
				)
			), 
			React.createElement("div", {className: "col-xs-12 col-md-6"}, 
				React.createElement("div", {className: "panel panel-danger"}, 
					React.createElement("div", {className: "panel-heading"}, "Bad achievements"), 
					React.createElement("ul", {className: "list-group"}, 
						this.items('bad')
					)
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
			switch (alignment) {
				case 'good':
				return theAchievement.get('points') > 0
				case 'bad':
				return theAchievement.get('points') < 0
				default:
				return false;
			}
		});
		return relevant
			.filter(function (theAchievement, achievementCode) {
				var isAdmin = that.props.isAdmin;
				var hasAchieved = !(marked.indexOf(achievementCode)<0);
				return isAdmin || hasAchieved;
			})
			.map(function (theAchievement, achievementCode) {
				var labelType;
				var isAdmin = that.props.isAdmin; // TODO: Remove glyphs for none admins.
				var hasAchieved = !(marked.indexOf(achievementCode)<0);
				if (!hasAchieved) {
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
							onClick: that.toggleAchievement.bind(that, achievementCode, hasAchieved), 
							style: {fontFamily: 'monospace'}
						}, 
							React.createElement("span", {className: "glyphicon glyphicon-" + labelGlyph})
						), 
						React.createElement("span", {style: {marginRight: '1em'}}, 
							theAchievement.get('text')
						)
					)
				);
			});
	}
	,
	toggleAchievement: function (achievementCode, hasAchieved) {
		var p = this.props;
		if (p.isAdmin) p.toggleAchievement(achievementCode, p.contestant, hasAchieved);
	}
});

module.exports = Achievements;
