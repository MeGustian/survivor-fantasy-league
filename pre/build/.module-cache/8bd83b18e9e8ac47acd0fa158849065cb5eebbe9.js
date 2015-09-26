var React = require('react');
var Achievements = require('./Achievements');

var Contestant = React.createClass({displayName: "Contestant",
	render: function () {
		return (
			React.createElement("div", {className: "thumbnail row", style: {border: 'none'}}, 
			React.createElement("div", {className: "col-md-5"}, 
				React.createElement("img", {
					className: "img-circle", 
					style: {marginRight: '10px', width: '200px', height: '200px'}, 
					src: "/images/contestants/" + this.props.name + ".jpg", 
					alt: this.props.name, 
					width: "200", 
					height: "200"}
				)
			), 
			React.createElement("div", {className: "col-md-7 center-block"}, 
				React.createElement("h3", {className: "text-center", style: {margin: '5px'}}, 
					this.props.name, 
					React.createElement("span", {className: "badge"}, this.props.scores.get('total'))
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
