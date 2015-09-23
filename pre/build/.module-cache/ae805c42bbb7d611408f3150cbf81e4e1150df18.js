var React = require('react');
var Achievements = require('./Achievements');

var Contestant = React.createClass({displayName: "Contestant",
	render: function () {
		return (
			React.createElement("div", {className: "col-xs-4"}, 
			React.createElement("div", {className: "thumbnail", style: {minHeight: '210px'}}, 
				React.createElement("div", null, React.createElement("img", {className: "img-rounded pull-left", style: {margin: '20px'}, src: "/images/contestants/" + this.props.name + ".jpg", alt: this.props.name}), 
				React.createElement("h3", null, this.props.name)), 
				React.createElement("ul", {className: "list-group", style: {clear: 'both'}}, 
	  React.createElement("li", {className: "list-group-item"}, "Cras justo odio"), 
	  React.createElement("li", {className: "list-group-item"}, "Dapibus ac facilisis in"), 
	  React.createElement("li", {className: "list-group-item"}, "Morbi leo risus"), 
	  React.createElement("li", {className: "list-group-item"}, "Porta ac consectetur ac"), 
	  React.createElement("li", {className: "list-group-item"}, "Vestibulum at eros")
	)
			)

			)
		);
	}
});

module.exports = Contestant;
