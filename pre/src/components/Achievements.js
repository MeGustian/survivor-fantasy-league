var React = require('react');
var AchievementsObj = require('../objects/Achievements');

var Achievements = React.createClass({
	render: function () {
		return (
			<div>
				<div className="panel panel-success">
					<div className="panel-heading">Good achievements</div>
					<div className="panel-body">
						<p>Listed below are {this.props.contestantName+'\'s'} good achievments.</p>
					</div>
					<ul className="list-group">
						{this.items('good')}
					</ul>
				</div>
				<div className="panel panel-danger">
					<div className="panel-heading">Bad achievements</div>
					<div className="panel-body">
						<p>Listed below are {this.props.contestantName+'\'s'} bad achievments.</p>
					</div>
					<ul className="list-group">
						{this.items('bad')}
					</ul>
				</div>
			</div>
		);
	}
	,
	items: function (alignment) {
		var that = this;
		var marked = this.props.marked.filter(function (isAchieved) {
			return isAchieved;
		}).keySeq();
		var relevant = AchievementsObj.filter(function (theAchievement) {
			return theAchievement.get('alignment') === alignment;
		});
		return relevant.map(function (theAchievement, achievementCode) {
			var badge;
			if (marked.indexOf(achievementCode)<0) {
				badge = 0;
			} else {
				badge = 1;
			}
			return (
				<li className="list-group-item">
					<span
						className="badge"
						onClick={that.toggleAchievement.bind(null, achievementCode)}
					>
						{badge}
					</span>
					{theAchievement.get('text')}
				</li>
			);
		})
	}
	,
	toggleAchievement: function (achievementCode) {
		this.props.toggleAchievement(achievementCode);
	}
});

module.exports = Achievements;
