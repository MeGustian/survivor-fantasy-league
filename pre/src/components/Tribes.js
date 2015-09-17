var React = require('react');

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
		return this.props.tribes.map(function (tribe) {
			return (
				<div className="tribe">
					{this.membersOf(tribe)}
				</div>
			);
		});
	}
	,
	membersOf: function (tribe) {
		return this.props.content.get(tribe).map(function (val) {
			var contestant = val.contestant;
			var achievements = val.achievements;
			return (
				<div className="tribe-mate">
					<div className="tribe-mate-name">
						{contestant.stringify()}
					</div>
					<div className="tribe-mate-achievements">
						{contestant.stringify()}
					</div>
				</div>
			)
		})
	}
});

module.exports = Potential;
