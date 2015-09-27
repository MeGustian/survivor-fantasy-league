var React = require('react/addons');
var Bs = require('react-bootstrap');
var Contestant = require('./Contestant');
var Achievements = require('./Achievements');

var Tribes = React.createClass({
	shouldComponentUpdate: function (nextProps) {
		return !!this.props.user.get('isAdmin');
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
		var byTribe =
			that.props.contestants
				.groupBy(function (contestant) {
					return contestant.get('tribe');
				});
		return React.addons.createFragment(
			byTribe
				.filter(function (tribe, name) {return !!name})
				.map(function (tribe, name) {
					if (!name) { // Remove filter for this to work.
						name = "Voted Out";
					}
					var columns = byTribe.count() - 1; // Remove -1 when removing filter.
					return (
						<Bs.Col sm={12} md={12/columns} key={name}>
							<h2>{name}</h2>
							<Bs.Accordion>
								{that.membersOf(tribe)}
							</Bs.Accordion>
						</Bs.Col>
					);
				}).toJS()
		);
	}
	,
	membersOf: function (tribe) {
		var that = this;
		return React.addons.createFragment(
			tribe.map(function (contestant, id) {
				var name = contestant.get('firstName') + " " + contestant.get('lastName');
				return (
					<Bs.Panel header={name} eventKey={id}>
						<Contestant
							contestant={id}
							name={name}
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
			}).toJS()
		);
	}
});

module.exports = Tribes;
