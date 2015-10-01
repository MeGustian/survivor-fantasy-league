var React = require('react');
var Bs = require('react-bootstrap');
var Achievements = require('./Achievements');
var MyThumbnail = require('./MyThumbnail');
var Map = require('immutable').Map;

var AdminAchievements = React.createClass({displayName: "AdminAchievements",
	render: function () {
		return (
			React.createElement(Bs.Row, null, 
			React.createElement(Bs.Col, {sm: 12}, 
				React.createElement("div", {className: "panel panel-success"}, 
					React.createElement("div", {className: "panel-heading"}, 
						"Good achievements"
					), 
					React.createElement("ul", {className: "list-group"}, 
						this.items('good')
					)
				)
			), 
			React.createElement(Bs.Col, {sm: 12}, 
				React.createElement("div", {className: "panel panel-danger"}, 
					React.createElement("div", {className: "panel-heading"}, 
						"Bad achievements"
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
		return React.addons.createFragment(
			that
				.filterByAlignment(alignment)
				.map(function (theAchievement, achievementCode) {
					return (
						React.createElement("li", {className: "list-group-item", key: achievementCode}, 
							React.createElement("span", {className: "pull-right"}, 
								that.contestants(achievementCode)
							), 
							React.createElement("span", {style: {marginRight: '1em'}}, 
								theAchievement.get('text')
							)
						)
					);
				}).toJS()
		);
	}
	,
	contestants: function (achievementCode) {
		var that = this;
		return React.addons.createFragment(
			that.props.contestants
				.sort(function (a, b) {
					var aS = a.getIn(['weeks', that.props.weekNumber, 'tribe']).toString();
					var bS = b.getIn(['weeks', that.props.weekNumber, 'tribe']).toString();
					return (aS.localeCompare(bS) > 0) ? 1 : ((aS.localeCompare(bS) < 0) ? -1 : 0);
				})
				.map(function (contestant, id) {
					var votedOut = !a.getIn(['weeks', that.props.weekNumber, 'tribe']);
					var hasAchieved = contestant.getIn(['weeks', that.props.weekNumber, 'achievements', achievementCode]);
					return (
						React.createElement(MyThumbnail, {
							id: id, 
							name: contestant.get('firstName') + " " + contestant.get('lastName'), 
							emphasized: !votedOut, 
							choose: that.toggleAchiever.bind(that, achievementCode, hasAchieved)}
						)
					);
				}).toJS()
		);
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
	toggleAchievement: function (achievementCode, hasAchieved, id) {
		this.props.toggleAchievement(achievementCode, id, hasAchieved);
	}
});

module.exports = AdminAchievements;
