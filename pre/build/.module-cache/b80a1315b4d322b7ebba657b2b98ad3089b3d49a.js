var React = require('react');
var Achievements = require('./Achievements');

var Contestant = React.createClass({displayName: "Contestant",
	render: function () {
		return (
			React.createElement("div", {className: "col-xs-4"}, 
			React.createElement("div", {className: "thumbnail"}, 
				React.createElement("img", {src: "/images/contestants/" + this.props.name + ".jpg", alt: this.props.name}), 
				React.createElement("div", {className: "caption"}, 
					React.createElement("h3", null, this.props.name)
				)
			)
			)
		);
	}
});

module.exports = Contestant;
