var React = require('react');
var ContestantObj = require('../objects/Contestant');

var Contestant = React.createClass({displayName: "Contestant",
	render: function () {
		var me = new ContestantObj(this.props.contestantId);
		return (
			React.createElement("div", {className: "tribe-mate"}, 
				React.createElement("div", {className: "tribe-mate-name"}, 
					me.fetch('name')
				), 
				React.createElement("div", {className: "tribe-mate-picture"}, 
					me.fetch('picture')
				), 
				React.createElement("div", {className: "tribe-mate-achievements"}, 
					me.fetch('achievements')
				)
			)
		);
	}
});

module.exports = Contestant;
