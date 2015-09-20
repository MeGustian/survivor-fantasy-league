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
		var alignmentToLabelType = {
			good: 'success',
			bad: 'danger'
		};
		var marked = this.props.marked.filter(function (isAchieved) {
			return isAchieved;
		}).keySeq();
		var relevant = AchievementsObj.filter(function (theAchievement) {
			return theAchievement.get('alignment') === alignment;
		});
		return relevant
			.filter(function (theAchievement, achievementCode) {
				var isAdmin = that.props.isAdmin;
				var hasAchieved = !(marked.indexOf(achievementCode)<0);
				return isAdmin || hasAchieved;
			})
			.map(function (theAchievement, achievementCode) {
				var labelType;
				var hasAchieved = marked.indexOf(achievementCode)<0;
				if (hasAchieved) {
					labelType = 'default';
					labelGlyph = 'remove-sign';
				} else {
					labelType = alignmentToLabelType[alignment];
					labelGlyph = 'ok-sign';
				}
				return (
					<li className="list-group-item">
						<span
							className={"pull-right label label-" + labelType}
							onClick={that.toggleAchievement.bind(that, achievementCode)}
							style={{fontFamily: 'monospace'}}
						>
							<span className={"glyphicon glyphicon-" + labelGlyph}></span>
						</span>
						<span style={{marginRight: '1em'}}>
							{theAchievement.get('text')}
						</span>
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
