var React = require('react');
var AchievementsObj = require('../objects/Achievements');

var Achievements = React.createClass({displayName: "Achievements",
	render: function () {
		return (
			React.createElement("div", {className: "col-xs-8"}, 
			React.createElement("div", {className: "row"}, 
			React.createElement("div", {className: "col-xs-12 col-md-6"}, 
				React.createElement("div", {className: "panel panel-success"}, 
					React.createElement("div", {className: "panel-heading"}, 
						"Good achievements", 
						React.createElement("span", {className: "badge pull-right"}, "4")
					), 
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
		return this
			.filterByAlignment(alignment)
			.filter(function (theAchievement, achievementCode) {
				var isAdmin = that.props.isAdmin;
				var hasAchieved = !!that.props.achievements.get(achievementCode);
				return isAdmin || hasAchieved;
			})
			.map(function (theAchievement, achievementCode) {
				var labelType;
				var isAdmin = that.props.isAdmin; // TODO: Remove glyphs for none admins.
				var hasAchieved = !!that.props.achievements.get(achievementCode);
				if (!hasAchieved) {
					labelType = 'default';
					labelGlyph = 'remove-sign';
				} else {
					labelType = alignmentToLabelType[alignment];
					labelGlyph = 'ok-sign';
				}
				return (
					React.createElement("li", {className: "list-group-item", key: achievementCode}, 
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
	score: function (alignment) {
		return this
			.filterByAlignment(alignment)
			.reduce(function (reduction, theAchievement) {
				return reduction + theAchievement.get('points');
			});
	}
	,
	filterByAlignment: function (alignment) {
		return AchievementsObj.filter(function (theAchievement) {
			switch (alignment) {
				case 'good':
				return theAchievement.get('points') > 0
				case 'bad':
				return theAchievement.get('points') < 0
				default:
				return false;
			}
		});
	}
	,
	toggleAchievement: function (achievementCode, hasAchieved) {
		var p = this.props;
		if (p.isAdmin) p.toggleAchievement(achievementCode, p.contestant, hasAchieved);
	}
});

module.exports = Achievements;
