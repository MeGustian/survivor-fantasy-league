var React = require('react');
var Bs = require('react-bootstrap');
var Achievements = require('./Achievements');

var Contestant = React.createClass({displayName: "Contestant",
	shouldComponentUpdate: function (nextProps) {
		var equal = (this.props.scores === nextProps.scores
			&& this.props.votedOut === nextProps.votedOut);
		if (equal) {
			console.log('Contestant found equal');
		}
		return !equal;
	}
	,
	render: function () {
		return (
			React.createElement(Bs.Row, null, 
			React.createElement(Bs.Col, {sm: 12, md: 4}, 
				React.createElement("img", {
					className: "img-circle", 
					style: {marginRight: '10px', width: '200px', height: '200px'}, 
					src: "/images/contestants/" + this.props.name + ".jpg", 
					alt: this.props.name, 
					width: "200", 
					height: "200"}
				)
			), 
			React.createElement(Bs.Col, {sm: 12, md: 8}, 
				React.createElement("h3", {className: "text-center", style: {marginRight: '5px'}}, 
					this.props.votedOut ? React.createElement("span", {className: "badge progress-bar-danger", style: {marginRight: '0.5em'}}, "voted out") : "", 
					this.props.name, 
					React.createElement("span", {className: "badge", style: {marginLeft: '0.5em'}}, this.props.scores.get('total'))
				), 
				React.createElement("dl", {className: "dl-horizontal"}, 
					React.createElement("dt", null, "Age"), 
					React.createElement("dd", null, this.props.age), 
					React.createElement("dt", null, "Occupation"), 
					React.createElement("dd", null, this.props.occupation), 
					React.createElement("dt", null, "Previous season"), 
					React.createElement("dd", null, this.props.previousSeason, React.createElement("br", null), "finished " + this.props.place)
				)
			)
			)
		);
	}
});

module.exports = Contestant;
