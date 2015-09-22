var React = require('react');
var ContestantObj = require('../objects/Contestant');
var Achievements = require('./Achievements');

var Contestant = React.createClass({
	render: function () {
		return (
			<div className="tribe-mate">
				<h3 className="tribe-mate-name">
					{this.props.name}
				</h3>
				<img src={"/images/" + this.props.name + ".png"} alt={this.props.name} />
				<Achievements
					contestantName={this.props.name}
					marked={this.props.achievements}
					isAdmin={this.props.isAdmin}
					toggleAchievement={this.toggleAchievement}
				/>
			</div>
		);
	}
	,
	toggleAchievement: function (achievementCode) {
		var p = this.props;
		if (p.isAdmin) p.toggleAchievement(achievementCode, p.contestant);
	}
});

module.exports = Contestant;
