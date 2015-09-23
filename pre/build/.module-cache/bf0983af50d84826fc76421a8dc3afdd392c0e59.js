var React = require('react');
var AchievementsObj = require('../objects/Achievements');

var Achievements = React.createClass({displayName: "Achievements",
	render: function () {
		return (
			React.createElement("div", {className: "col-xs-6"}, 
			React.createElement("div", {className: "row"}, 
			React.createElement("div", {className: "col-xs-12 col-md-6"}, 
				React.createElement("div", {className: "panel panel-success"}, 
					React.createElement("div", {className: "panel-heading"}, 
						"Good achievements", 
						React.createElement("span", {className: "badge pull-right"}, this.score('good'))
					), 
					React.createElement("ul", {className: "list-group"}, 
						this.items('good')
					)
				)
			), 
			React.createElement("div", {className: "col-xs-12 col-md-6"}, 
				React.createElement("div", {className: "panel panel-danger"}, 
					React.createElement("div", {className: "panel-heading"}, 
						"Bad achievements", 
						React.createElement("span", {className: "badge pull-right"}, this.score('bad'))
					), 
					React.createElement("ul", {className: "list-group"}, 
						this.items('bad')
					)
				)
			)
			)
			)
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
					React.createElement("li", {className: "list-group-item", key: achievementCode}, 
						React.createElement("span", {
							className: "badge pull-right", 
							onClick: that.toggleAchievement.bind(that, achievementCode, hasAchieved)
						}, 
							hasAchieved ? theAchievement.get('points') : 0
						), 
						React.createElement("span", {style: {marginRight: '1em'}}, 
							theAchievement.get('text')
						)
					)
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
