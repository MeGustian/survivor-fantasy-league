var React = require('react');
var Achievements = require('./Achievements');

var Contestant = React.createClass({displayName: "Contestant",
	render: function () {
		return (
			React.createElement("div", {className: "col-xs-6"}, 
			React.createElement("div", {className: "thumbnail", style: {minHeight: '210px'}}, 
				React.createElement("img", {
					className: "img-rounded pull-left", 
					style: {marginRight: '10px'}, 
					src: "/images/contestants/" + this.props.name + ".jpg", 
					alt: this.props.name, 
					width: "200", 
					height: "200"}
				), 
				React.createElement("h3", {style: {margin: '5px'}}, this.props.name + " ", React.createElement("span", {className: "badge"}, this.props.scores.get('total'))), 
				React.createElement("dl", {className: "dl-horizontal"}, 
					React.createElement("dt", null, "age"), 
					React.createElement("dd", null, "33")
				)
			)
			)
		);
	}
});

module.exports = Contestant;
