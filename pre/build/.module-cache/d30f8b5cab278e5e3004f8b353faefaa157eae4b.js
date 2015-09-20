var React = require('react');

var Questions = React.createClass({displayName: "Questions",
	render: function () {
		var style = {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'flex-start',
			alignItems: 'center'
		};
		return (
			React.createElement("div", {className: "tribes-container", style: style}, 
				this.tribes()
			)
		);
	}
	,
	tribes: function () {
		var style = {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'flex-start',
			alignItems: 'center'
		};
		var that = this;
		return this.props.tribes.map(function (tribe, tribeName) {
			return (
				React.createElement("div", {className: "tribe", key: tribeName}, 
					React.createElement("h2", null, tribeName), 
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

module.exports = Questions;
