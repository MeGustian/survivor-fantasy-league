var React = require('react');
var AchievementsObj = require('../objects/Achievements');

var Achievements = React.createClass({
	render: function () {
		return (
			<div className="col-xs-8">
			<div className="row">
			<div className="col-xs-12 col-md-6">
				<div className="panel panel-success">
					<div className="panel-heading">
						Good achievements
						<span className="badge pull-right">{this.score('good')}</span>
					</div>
					<ul className="list-group">
						{this.items('good')}
					</ul>
				</div>
			</div>
			<div className="col-xs-12 col-md-6">
				<div className="panel panel-danger">
					<div className="panel-heading">
						Bad achievements
						<span className="badge pull-right">{this.score('bad')}</span>
					</div>
					<ul className="list-group">
						{this.items('bad')}
					</ul>
				</div>
			</div>
			</div>
			</div>
		);
	}
	,
	items: function (alignment) {
		var that = this;
		// var alignmentToLabelType = {
		// 	good: 'success',
		// 	bad: 'danger'
		// };
		return this
			.filterByAlignment(alignment)
			.filter(function (theAchievement, achievementCode) {
				var isAdmin = that.props.isAdmin;
				var hasAchieved = !!that.props.achievements.get(achievementCode);
				return isAdmin || hasAchieved;
			})
			.map(function (theAchievement, achievementCode) {
				var labelType;
				var isAdmin = that.props.isAdmin; // TODO: Remove glyphs for none admins.
				var hasAchieved = !!that.props.achievements.get(achievementCode);
				return (
					<li className="list-group-item" key={achievementCode}>
						<span
							className={"badge pull-right"}
							onClick={that.toggleAchievement.bind(that, achievementCode, hasAchieved)}
						>
							{hasAchieved ? theAchievement.get('points') : 0}
						</span>
						<span style={{marginRight: '1em'}}>
							{theAchievement.get('text')}
						</span>
					</li>
				);
				// if (!hasAchieved) {
				// 	labelType = 'default';
				// 	labelGlyph = 'remove-sign';
				// } else {
				// 	labelType = alignmentToLabelType[alignment];
				// 	labelGlyph = 'ok-sign';
				// }
				// return (
				// 	<li className="list-group-item" key={achievementCode}>
				// 		<span
				// 			className={"pull-right label label-" + labelType}
				// 			onClick={that.toggleAchievement.bind(that, achievementCode, hasAchieved)}
				// 			style={{fontFamily: 'monospace'}}
				// 		>
				// 			<span className={"glyphicon glyphicon-" + labelGlyph}></span>
				// 		</span>
				// 		<span style={{marginRight: '1em'}}>
				// 			{theAchievement.get('text')}
				// 		</span>
				// 	</li>
				// );
			});
	}
	,
	score: function (alignment) {
		var that = this;
		return this
			.filterByAlignment(alignment)
			.filter(function (theAchievement, achievementCode) {
				return !!that.props.achievements.get(achievementCode);
			})
			.reduce(function (reduction, theAchievement) {
				return reduction + theAchievement.get('points');
			}, 0);
	}
	,
	filterByAlignment: function (alignment) {
		return AchievementsObj.filter(function (theAchievement) {
			switch (alignment) {
				case 'good':
				return theAchievement.get('points') > 0
				case 'bad':
				return theAchievement.get('points') < 0
				default:
				return false;
			}
		});
	}
	,
	toggleAchievement: function (achievementCode, hasAchieved) {
		var p = this.props;
		if (p.isAdmin) p.toggleAchievement(achievementCode, p.contestant, hasAchieved);
	}
});

module.exports = Achievements;
