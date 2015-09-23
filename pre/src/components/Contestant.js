var React = require('react');
var Achievements = require('./Achievements');

var Contestant = React.createClass({
	render: function () {
		return (
			<div className="col-xs-6">
			<div className="thumbnail" style={{minHeight: '210px'}}>
				<img className="img-rounded pull-left" style={{marginRight: '10px'}} src={"/images/contestants/" + this.props.name + ".jpg"} alt={this.props.name} />
				<h3 style={{margin: '5px'}}>{this.props.name + " "}<span className="badge">{this.props.scores.get('total')}</span></h3>
			</div>
			</div>
		);
	}
});

module.exports = Contestant;
