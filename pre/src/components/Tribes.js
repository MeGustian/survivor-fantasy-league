var React = require('react');
var Contestant = require('./Contestant');

var Tribes = React.createClass({
	render: function () {
		return (
			<div className="tribes-container">
				{this.tribes()}
			</div>
		);
	}
	,
	tribes: function () {
		var that = this;
		return this.props.tribes.map(function (tribe, tribeName) {
			return (
				<div className="tribe" key={tribeName}>
					{that.membersOf(tribe)}
				</div>
			);
		});
	}
	,
	membersOf: function (tribe) {
		var that = this;
		return tribe.map(function (val) {
			var contestant = val.get('contestant');
			// var achievements = val.get('achievements');
			var achievements = that.props.achievements.get(contestant);
			return (
				<Contestant
					contestantId={contestant}
					achievements={achievements}
					toggleAchievement={that.props.toggleAchievement}
					key={contestant}
				/>
			);
		});
	}
});

module.exports = Tribes;
