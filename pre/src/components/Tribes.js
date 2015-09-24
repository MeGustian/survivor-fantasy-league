var React = require('react');
var Bs = require('react-bootstrap');
var Contestant = require('./Contestant');
var Achievements = require('./Achievements');

var Tribes = React.createClass({
	shouldComponentUpdate: function (nextProps) {
		return !!this.props.user.isAdmin;
	}
	,
	render: function () {
		return (
			<Bs.Row>
				{this.tribes()}
			</Bs.Row>
		);
	}
	,
	tribes: function () {
		var that = this;
		var byTribe = this.props.contestants
			.groupBy(function (contestant) {
				return contestant.get('tribe');
			});
		return byTribe
			.map(function (tribe, name) {
				if (!name) {
					name = "Voted Out";
				}
				return (
					<Bs.Col sm={12} md={12/byTribe.count()} key={name}>
						<h2>{name}</h2>
						<Bs.Accordion>
							{that.membersOf(tribe)}
						</Bs.Accordion>
					</Bs.Col>
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
				<Bs.Panel header={name} eventKey={id}>
				<Contestant
					contestant={id}
					name={contestant.get('firstName') + " " + contestant.get('lastName')}
					age={contestant.get('age')}
					occupation={contestant.get('occupation')}
					previousSeason={contestant.get('previousSeason')}
					place={contestant.get('place')}
					scores={that.props.scores.get(id)}
					votedOut={contestant.get('votedOut')}
				/>
				<Achievements
					contestant={id}
					isAdmin={that.props.user.get('isAdmin')}
					achievements={contestant.get('achievements')}
					scores={that.props.scores.get(id)}
					toggleAchievement={that.props.toggleAchievement}
				/>
				</Bs.Panel>
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
