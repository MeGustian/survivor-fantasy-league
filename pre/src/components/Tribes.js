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
		return this.props.tribes.map(function (tribe, tribeName) {
			return (
				<div className="tribe" style={style} key={tribeName}>
					<h2>{tribeName}</h2>
					{that.membersOf(tribe)}
				</div>
			);
		});
	}
	,
	membersOf: function (tribe) {
		var that = this;
		return tribe.map(function (content, contestant) {
			return (
				<Contestant
					isAdmin={that.props.user.get('isAdmin')}
					contestant={contestant}
					achievements={content.get('achievements')}
					toggleAchievement={that.props.toggleAchievement}
					key={contestant}
				/>
			);
		});
	}
});

module.exports = Tribes;
