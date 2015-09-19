var React = require('react');
var Contestant = require('../components/Contestant');

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
		return this.props.tribes.map(function (tribe) {
			return (
				React.createElement("div", {className: "tribe", key: tribe}, 
					this.membersOf(tribe)
				)
			);
		});
	}
	,
	membersOf: function (tribe) {
		return this.props.content.get(tribe).map(function (val) {
			var contestant = val.contestant;
			var achievements = val.achievements;
			return (
				React.createElement(Contestant, {contestantId: contestant, key: contestant})
			);
		});
	}
});

module.exports = Tribes;
