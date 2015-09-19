var React = require('react');
var ContestantObj = require('../objects/Contestant');
var Achievements = require('./Achievements');

var Contestant = React.createClass({
	render: function () {
		var me = new ContestantObj(this.props.contestantId);
		return (
			<div className="tribe-mate">
				<div className="tribe-mate-name">
					{me.getName()}
				</div>
				<div className="tribe-mate-image">
					<img src={"/images/" + me.getName() + ".png"} alt="INSERT IMAGE" />
				</div>
				<div className="tribe-mate-achievements">
					<Achievements
						contestantName={me.getName()}
						marked={this.props.achievements}
						toggleAchievement={this.toggleAchievement}
					/>
				</div>
			</div>
		);
	}
	,
	toggleAchievement: function (achievementCode) {
		var id = this.props.contestantId;
		this.props.toggleAchievement(achievementCode, id);
	}
});

module.exports = Contestant;
