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
		return tribe.map(function (contestant, id) {
			return (
				React.createElement(Contestant, {
					isAdmin: that.props.user.get('isAdmin'), 
					contestant: id, 
					achievements: contestant.get('achievements'), 
					toggleAchievement: that.props.toggleAchievement, 
					key: id}
				)
			);
		});
	}
});

module.exports = Tribes;
