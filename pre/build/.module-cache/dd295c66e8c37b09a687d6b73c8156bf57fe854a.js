var React = require('react');

var Achievements = React.createClass({displayName: "Achievements",
	render: function () {
		return (
			React.createElement("div", {class: "panel panel-success"}, 
				React.createElement("div", {class: "panel-heading"}, "Panel heading"), 
				React.createElement("div", {class: "panel-body"}, 
					React.createElement("p", null, "...")
				), 

				React.createElement("ul", {class: "list-group"}, 
					React.createElement("li", {class: "list-group-item"}, "Cras justo odio"), 
					React.createElement("li", {class: "list-group-item"}, "Dapibus ac facilisis in"), 
					React.createElement("li", {class: "list-group-item"}, "Morbi leo risus"), 
					React.createElement("li", {class: "list-group-item"}, "Porta ac consectetur ac"), 
					React.createElement("li", {class: "list-group-item"}, "Vestibulum at eros")
				)
			)
		);
	}
});

module.exports = Achievements;
