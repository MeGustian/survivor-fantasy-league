var React = require('react');
var ContestantObj = require('../objects/Contestant');
var Achievements = require('./Achievements');

var Contestant = React.createClass({
	render: function () {
		var me = new ContestantObj(this.props.contestant);
		return (
			<div className="tribe-mate">
				{this.renderName(me)}
				{this.renderImage(me)}
				{this.renderAchievements(me)}
			</div>
		);
	}
	,
	renderName: function (me) {
		return (
			<h3 className="tribe-mate-name">
				{me.getName()}
			</h3>
		);
	}
	,
	renderImage: function (me) {
		return (
			<div className="tribe-mate-image">
				<img src={"/images/" + me.getName() + ".png"} alt="INSERT IMAGE" />
			</div>
		);
	}
	,
	renderAchievements: function (me) {
		if (typeof this.props.achievements === 'undefined') {
			return;
		}
		return (
			<div className="tribe-mate-achievements">
				<Achievements
					contestantName={me.getName()}
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
