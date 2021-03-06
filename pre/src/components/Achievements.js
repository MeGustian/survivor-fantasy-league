var React = require('react/addons');
var Bs = require('react-bootstrap');
var AchievementsObj = require('../objects/Achievements');

var Achievements = React.createClass({
	shouldComponentUpdate: function (nextProps) {
		var equal = (
			this.props.scores.every(function (val, key) {
				return val === nextProps.scores.get(key);
			}) &&
			this.props.achievements.every(function (val, key) {
				return val === nextProps.achievements.get(key);
			})
		);
		return !equal;
	}
	,
	render: function () {
		var scroll = {
			maxHeight: '150px',
			overflowY: 'scroll'
		};
		return (
			<Bs.Row>
			<Bs.Col sm={12} md={6}>
				<div className="panel panel-success">
					<div className="panel-heading">
						Good achievements
						<span className="badge pull-right">{this.props.scores.get('good')}</span>
					</div>
					<ul className="list-group" style={scroll}>
						{this.items('good')}
					</ul>
				</div>
			</Bs.Col>
			<Bs.Col sm={12} md={6}>
				<div className="panel panel-danger">
					<div className="panel-heading">
						Bad achievements
						<span className="badge pull-right">{this.props.scores.get('bad')}</span>
					</div>
					<ul className="list-group" style={scroll}>
						{this.items('bad')}
					</ul>
				</div>
			</Bs.Col>
			</Bs.Row>
		);
	}
	,
	items: function (alignment) {
		var that = this;
		return React.addons.createFragment(
			that
				.filterByAlignment(alignment)
				.filter(function (theAchievement, achievementCode) {
					var hasAchieved = !!that.props.achievements.get(achievementCode);
					return that.props.isAdmin || that.props.isHelp || hasAchieved;
				})
				.map(function (theAchievement, achievementCode) {
					var labelType;
					var hasAchieved = !!that.props.achievements.get(achievementCode);
					var mult = (theAchievement.get('extra') === '10*(weekNumber)') ? that.props.weekNumber : 1;
					var badge = hasAchieved ? theAchievement.get('points')*mult : 0;
					if (that.props.isAdmin) {
						badge += " / " + theAchievement.get('points')*mult;
					}
					if (that.props.isHelp) {
						badge = theAchievement.get('points');
						if ((theAchievement.get('extra') === '10*(weekNumber)')) {
							badge += ' ' + String.fromCharCode(215) + ' episode week';
						}
					}
					return (
						<li className="list-group-item" key={achievementCode}>
							<span
								className={"badge pull-right"}
								onClick={that.toggleAchievement.bind(that, achievementCode, hasAchieved)}
							>
								{badge}
							</span>
							<span style={{marginRight: '1em'}}>
								{theAchievement.get('text')}
							</span>
						</li>
					);
				}).toJS()
		);
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
