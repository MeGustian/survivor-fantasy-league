var React = require('react');
var Contestant = require('./Contestant');

var Tribes = React.createClass({displayName: "Tribes",
	render: function () {
		// var style = {
		// 	display: 'flex',
		// 	flexDirection: 'row',
		// 	justifyContent: 'space-around',
		// 	alignItems: 'baseline'
		// };
		return (
			React.createElement("div", {className: "row"}, 
				this.tribes()
			)
		);
	}
	,
	tribes: function () {
		// var style = {
		// 	display: 'flex',
		// 	flexDirection: 'column',
		// 	justifyContent: 'flex-start',
		// 	alignItems: 'center'
		// };
		var that = this;
		return this.props.contestants
			.groupBy(function (contestant) {
				return contestant.get('tribe');
			}).map(function (tribe, name) {
				return (
					React.createElement("div", {className: "col-xs-12", key: name}, 
						React.createElement("div", {className: "row"}, React.createElement("div", {className: "col-xs-12"}, React.createElement("h2", null, name))), 
						React.createElement("div", {className: "row"}, that.membersOf(tribe))
					)
				);
			});
	}
	,
	membersOf: function (tribe) {
		var that = this;
		return tribe.map(function (contestant, id) {
			return (
				React.createElement("div", {className: "col-xs-12 col-sm-6 col-md-4"}, 
					React.createElement(Contestant, {
						isAdmin: that.props.user.get('isAdmin'), 
						contestant: id, 
						name: contestant.get('name'), 
						achievements: contestant.get('achievements'), 
						toggleAchievement: that.props.toggleAchievement, 
						key: id}
					)
				)
			);
		});
	}
});

module.exports = Tribes;
