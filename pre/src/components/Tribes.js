var React = require('react');
var Contestant = require('./Contestant');
var Achievements = require('./Achievements');

var Tribes = React.createClass({
	render: function () {
		return (
			<div className="row">
				{this.tribes()}
			</div>
		);
	}
	,
	tribes: function () {
		var that = this;
		return this.props.contestants
			.groupBy(function (contestant) {
				return contestant.get('tribe');
			}).map(function (tribe, name) {
				return (
					<div className="col-xs-12" key={name}>
						<div className="row"><div className="col-xs-12"><h2>{name}</h2></div></div>
						{that.membersOf(tribe)}
					</div>
				);
			});
	}
	,
	membersOf: function (tribe) {
		var that = this;
		// var gotVotesFrom = tribe
		// 	.groupBy(function (contestant) {
		// 		return contestant.get('votedFor');
		// 	})
		// 	.map(function (voteOrigins) {
		// 		return voteOrigins.keySeq();
		// 	});
		// var votedOut = gotVotesFrom
		// 	.maxBy(function (voteOrigins) {
		// 		return voteOrigin.count();
		// 	}, function (a, b) {
		// 		a > b;
		// 	});
		// console.log(gotVotesFrom.toString());
		// console.log(votedOut);
		return tribe.map(function (contestant, id) {
			return (
				<div className="row" key={id}>
					<Contestant
						contestant={id}
						name={contestant.get('firstName') + " " + contestant.get('lastName')}
						scores={that.props.scores.get(id)}
					/>
					<Achievements
						contestant={id}
						isAdmin={that.props.user.get('isAdmin')}
						achievements={contestant.get('achievements')}
						scores={that.props.scores.get(id)}
						toggleAchievement={that.props.toggleAchievement}
					/>
				</div>
			);
		});
	}
});

module.exports = Tribes;
