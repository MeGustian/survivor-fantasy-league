var React = require('react');
var ContestantObj = require('../objects/Contestant');

var Contestant = React.createClass({displayName: "Contestant",
	render: function () {
		var me = new ContestantObj(this.props.contestantId);
		return (
			React.createElement("div", {className: "tribe-mate"}, 
				React.createElement("div", {className: "tribe-mate-name"}, 
					me.fetch('NAME')
				), 
				React.createElement("div", {className: "tribe-mate-image"}, 
					me.fetch('IMAGE')
				), 
				React.createElement("div", {className: "tribe-mate-achievements"}, 
					me.fetch('ACHIEVEMENTS')
				)
			)
		);
	}
});

module.exports = Contestant;
