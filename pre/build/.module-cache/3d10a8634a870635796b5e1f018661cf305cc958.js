var React = require('react');
var Contestant = require('./Contestant');

var Tribes = React.createClass({displayName: "Tribes",
	render: function () {
		return (
			React.createElement("div", {className: "tribes-container"}, 
				this.tribes()
			)
		);
	}
	,
	tribes: function () {
		var that = this;
		return this.props.tribes.map(function (tribe, tribeName) {
			return (
				React.createElement("div", {className: "tribe", key: tribeName}, 
					that.membersOf(tribe)
				)
			);
		});
	}
	,
	membersOf: function (tribe) {
		var that = this;
		return tribe.map(function (val) {
			var contestant = val.get('contestant');
			// var achievements = val.get('achievements');
			var achievements = that.props.achievements.get(contestant);
			return (
				React.createElement(Contestant, {
					contestantId: contestant, 
					achievements: achievements, 
					toggleAchievement: that.props.toggleAchievement, 
					key: contestant}
				)
			);
		});
	}
});

module.exports = Tribes;
