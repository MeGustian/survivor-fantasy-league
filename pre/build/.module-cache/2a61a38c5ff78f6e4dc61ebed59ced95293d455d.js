var React = require('react');
var ContestantObj = require('../objects/Contestant');
var Achievements = require('./Achievements');

var Contestant = React.createClass({displayName: "Contestant",
	render: function () {
		var me = new ContestantObj(this.props.contestantId);
		console.log(me.getId());
		return (
			React.createElement("div", {className: "tribe-mate"}, 
				React.createElement("div", {className: "tribe-mate-name"}, 
					me.getName()
				), 
				React.createElement("div", {className: "tribe-mate-image"}, 
					React.createElement("img", {src: "/images/" + me.getName() + ".png", alt: "INSERT IMAGE"})
				), 
				React.createElement("div", {className: "tribe-mate-achievements"}, 
					React.createElement(Achievements, {
						contestantName: me.getName(), 
						marked: this.props.achievements, 
						badgeClick: this.badgeClick}
					)
				)
			)
		);
	}
});

module.exports = Contestant;
