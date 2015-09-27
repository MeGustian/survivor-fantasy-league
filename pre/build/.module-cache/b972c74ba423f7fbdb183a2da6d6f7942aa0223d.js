var React = require('react/addons');
var Bs = require('react-bootstrap');
var Contestant = require('./Contestant');
var Achievements = require('./Achievements');

var Tribes = React.createClass({displayName: "Tribes",
	shouldComponentUpdate: function (nextProps) {
		return !!this.props.user.get('isAdmin');
	}
	,
	render: function () {
		return (
			React.createElement(Bs.Row, null, 
				this.tribes()
			)
		);
	}
	,
	tribes: function () {
		var that = this;
		var byTribe =
			that.props.contestants
				.groupBy(function (contestant) {
					return contestant.get('tribe');
				});
		return React.addons.createFragment(
			byTribe
				.filter(function (tribe, name) {return !!name})
				.map(function (tribe, name) {
					if (!name) { // Remove filter for this to work.
						name = "Voted Out";
					}
					return (
						React.createElement(Bs.Col, {sm: 12, md: 12/byTribe.count(), key: name}, 
							React.createElement("h2", null, name), 
							React.createElement(Bs.Accordion, null, 
								that.membersOf(tribe)
							)
						)
					);
				}).toJS()
		);
	}
	,
	membersOf: function (tribe) {
		var that = this;
		return React.addons.createFragment(
			tribe.map(function (contestant, id) {
				var name = contestant.get('firstName') + " " + contestant.get('lastName');
				return (
					React.createElement(Bs.Panel, {header: name, eventKey: id}, 
						React.createElement(Contestant, {
							contestant: id, 
							name: name, 
							age: contestant.get('age'), 
							occupation: contestant.get('occupation'), 
							previousSeason: contestant.get('previousSeason'), 
							place: contestant.get('place'), 
							scores: that.props.scores.get(id), 
							votedOut: contestant.get('votedOut')}
						), 
						React.createElement(Achievements, {
							contestant: id, 
							isAdmin: that.props.user.get('isAdmin'), 
							achievements: contestant.get('achievements'), 
							scores: that.props.scores.get(id), 
							toggleAchievement: that.props.toggleAchievement}
						)
					)
				);
			}).toJS()
		);
	}
});

module.exports = Tribes;
