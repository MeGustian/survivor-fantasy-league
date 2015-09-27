var React = require('react');
var Bs = require('react-bootstrap');
var Achievements = require('./Achievements');
var nameToImg = require('../helpers/image-name')('contestant');

var Contestant = React.createClass({
	shouldComponentUpdate: function (nextProps) {
		if (typeof this.props.scores !== 'object') {
			if (typeof nextProps.scores !== 'object') {
				return !(this.props.votedOut === nextProps.votedOut);
			} else {
				return true;
			}
		} else {
			if (typeof nextProps.scores !== 'object') {
				return true;
			} else {
				return !(
					this.props.scores.every(function (val, key) {
						return val === nextProps.scores.get(key);
					}) &&
					this.props.votedOut === nextProps.votedOut
				);
			}
		}
	}
	,
	render: function () {
		return (
			<Bs.Row>
			<Bs.Col sm={12} md={4}>
				<img
					className="img-circle"
					style={{marginRight: '10px', width: '200px', height: '200px', marginBottom: '15px'}}
					src={nameToImg(this.props.name)}
					alt={this.props.name}
					width="200"
					height="200"
				/>
			</Bs.Col>
			<Bs.Col sm={12} md={8}>
				<h3 className="text-center" style={{marginRight: '5px'}}>
					{this.props.votedOut ? <span className="badge progress-bar-danger" style={{marginRight: '0.5em'}}>voted out</span> : ""}
					{this.props.name}
					{this.props.score ? <span className="badge" style={{marginLeft: '0.5em'}}>{this.props.scores.get('total')}</span> : ""}
				</h3>
				<dl className="dl-horizontal">
					<dt>{"Age"}</dt>
					<dd>{this.props.age}</dd>
					<dt>{"Occupation"}</dt>
					<dd>{this.props.occupation}</dd>
					<dt>{"Previous season"}</dt>
					<dd>{this.props.previousSeason}<br/>{"finished " + this.props.place}</dd>
				</dl>
			</Bs.Col>
			</Bs.Row>
		);
	}
});

module.exports = Contestant;
