var React = require('react');
var Achievements = require('./Achievements');

var Contestant = React.createClass({
	render: function () {
		return (
			<div className="col-xs-4">
			<div className="thumbnail">
				<img src={"/images/contestants/" + this.props.name + ".jpg"} alt={this.props.name} />
				<div className="caption">
					<h3>{this.props.name}</h3>
				</div>
			</div>
			</div>
		);
	}
});

module.exports = Contestant;
