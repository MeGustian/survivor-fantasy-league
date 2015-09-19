var React = require('react');
var I = require('immutable');
var List = I.List;

var Week = React.createClass({displayName: "Week",
	render: function () {
		return (
			React.createElement("div", {className: "dropdown"}, 
				React.createElement("button", {className: "btn btn-default dropdown-toggle", type: "button", id: "dropdownWeek", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "true"}, 
					React.createElement("span", null, "Week"), 
					React.createElement("span", {className: "caret"})
				), 
				React.createElement("ul", {className: "dropdown-menu", "aria-labelledby": "dropdownWeek"}, 
					this.items()
				)
			)
		);
	}
	,
	items: function () {
		var that = this;
		return List().setSize(that.props.weekCount).map(function (empty, i) {
			return (
				React.createElement("li", {onClick: that.handleClick, key: i+1}, React.createElement("a", {href: "#"}, i+1))
			)
		});
	}
	,
	handleClick: function (e) {
		console.log(e);
		this.props.onWeekChoice();
	}
});

module.exports = Week;
