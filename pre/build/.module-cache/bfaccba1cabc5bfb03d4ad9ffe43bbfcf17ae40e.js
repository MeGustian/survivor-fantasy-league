var React = require('react');
var Bs = require('react-bootstrap');
var Contestant = require('./Contestant');
var Achievements = require('./Achievements');

var Tribes = React.createClass({displayName: "Tribes",
	render: function () {
		return (
			React.createElement(Bs.Row, null, 
				this.tribes()
			)
		);
	}
	,
	tribes: function () {
		var that = this;
		var byTribe = this.props.contestants
			.groupBy(function (contestant) {
				return contestant.get('tribe');
			});
		var count = byTribe.count();
		return byTribe.map(function (tribe, name) {
				return (
					React.createElement(Bs.Col, {sm: 12, md: 12/count, key: name}, 
						React.createElement("h2", null, name), 
						React.createElement(Bs.Accordion, null, 
							that.membersOf(tribe)
						)
					)
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
			var name = contestant.get('firstName') + " " + contestant.get('lastName');
			return (
				React.createElement(Bs.Panel, {header: name, eventKey: id}, 
				React.createElement(Contestant, {
					contestant: id, 
					name: contestant.get('firstName') + " " + contestant.get('lastName'), 
					age: contestant.get('age'), 
					occupation: contestant.get('occupation'), 
					previousSeason: contestant.get('previousSeason'), 
					place: contestant.get('place'), 
					scores: that.props.scores.get(id), 
					votedOut: contestant.get('votedOut')}
				), 
				React.createElement(Achievements, {
					contestant: id, 
					isAdmin: that.props.user.get('isAdmin'), 
					achievements: contestant.get('achievements'), 
					scores: that.props.scores.get(id), 
					toggleAchievement: that.props.toggleAchievement}
				)
				)
			);
			// return (
			// 	<div className="row" key={id}>
			// 		<Contestant
			// 			contestant={id}
			// 			name={contestant.get('firstName') + " " + contestant.get('lastName')}
			// 			age={contestant.get('age')}
			// 			occupation={contestant.get('occupation')}
			// 			previousSeason={contestant.get('previousSeason')}
			// 			place={contestant.get('place')}
			// 			scores={that.props.scores.get(id)}
			// 		/>
			// 		<Achievements
			// 			contestant={id}
			// 			isAdmin={that.props.user.get('isAdmin')}
			// 			achievements={contestant.get('achievements')}
			// 			scores={that.props.scores.get(id)}
			// 			toggleAchievement={that.props.toggleAchievement}
			// 		/>
			// 	</div>
			// );
		});
	}
});

module.exports = Tribes;
