var React = require('react');
var ContestantObj = require('../Contestant');

var Contestant = React.createClass({displayName: "Contestant",
	render: function () {
		var me = ContestantObj(this.props.contestantId);
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
