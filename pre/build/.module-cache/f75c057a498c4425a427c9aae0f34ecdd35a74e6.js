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
		return tribe.map(function (val) {
			var contestant = val.get('contestant');
			var achievements = val.get('achievements');
			return (
				React.createElement(Contestant, {contestantId: contestant, key: contestant})
			);
		});
	}
});

module.exports = Tribes;
