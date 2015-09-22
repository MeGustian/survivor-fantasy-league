var React = require('react');
var Contestant = require('./Contestant');

var Tribes = React.createClass({
	render: function () {
		var style = {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-around',
			alignItems: 'baseline'
		};
		return (
			<div className="tribes-container" style={style}>
				{this.tribes()}
			</div>
		);
	}
	,
	tribes: function () {
		var style = {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'flex-start',
			alignItems: 'center'
		};
		var that = this;
		return this.props.contestants
			.groupBy(function (contestant) {
				return contestant.get('tribe');
			}).map(function (tribe, name) {
				return (
					<div className="tribe" style={style} key={name}>
						<h2>{name}</h2>
						{that.membersOf(tribe)}
					</div>
				);
			});
	}
	,
	membersOf: function (tribe) {
		var that = this;
		return tribe.map(function (contestant, id) {
			return (
				<Contestant
					isAdmin={that.props.user.get('isAdmin')}
					contestant={id}
					name={contestant.get('name')}
					achievements={contestant.get('achievements')}
					toggleAchievement={that.props.toggleAchievement}
					key={id}
				/>
			);
		});
	}
});

module.exports = Tribes;
