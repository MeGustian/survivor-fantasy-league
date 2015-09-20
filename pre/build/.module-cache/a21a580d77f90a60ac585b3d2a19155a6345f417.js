var React = require('react');
var Contestant = require('./Contestant');

var Tribes = React.createClass({displayName: "Tribes",
	render: function () {
		var style = {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-around',
			alignItems: 'baseline'
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
				React.createElement("div", {className: "tribe", style: style, key: tribeName}, 
					React.createElement("h2", null, tribeName), 
					that.membersOf(tribe)
				)
			);
		});
	}
	,
	membersOf: function (tribe) {
		var that = this;
		console.log(that.props.toggleAchievement);
		return tribe.map(function (content, contestant) {
			return (
				React.createElement(Contestant, {
					isAdmin: that.props.user.get('isAdmin'), 
					contestant: contestant, 
					achievements: content.get('achievements'), 
					toggleAchievement: that.props.toggleAchievement, 
					key: contestant}
				)
			);
		});
	}
});

module.exports = Tribes;
