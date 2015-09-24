var React = require('react');
var Achievements = require('./Achievements');

var Contestant = React.createClass({
	render: function () {
		return (
			<div className="col-xs-6">
			<div className="thumbnail row">
			<div className="col-md-5">
				<img
					className="img-circle"
					style={{marginRight: '10px', width: '200px', height: '200px'}}
					src={"/images/contestants/" + this.props.name + ".jpg"}
					alt={this.props.name}
					width="200"
					height="200"
				/>
			</div>
			<div className="col-md-7 center-block" style={{border: 'none'}}>
				<h3 className="text-center" style={{margin: '5px'}}>
					{this.props.name}
					<span className="badge">{this.props.scores.get('total')}</span>
				</h3>
				<dl className="dl-horizontal">
					<dt>{"Age"}</dt>
					<dd>{this.props.age}</dd>
					<dt>{"Occupation"}</dt>
					<dd>{this.props.occupation}</dd>
					<dt>{"Previous season"}</dt>
					<dd>{this.props.previousSeason}<br/>{"finished " + this.props.place}</dd>
				</dl>
			</div>
			</div>
			</div>
		);
	}
});

module.exports = Contestant;
