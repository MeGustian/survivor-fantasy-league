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
		return List().setSize(that.props.count).map(function (empty, i) {
			return (
				React.createElement("li", {key: i+1}, 
					React.createElement("a", {href: "/admin/week/"+(i+1).toString()}, i+1)
				)
			)
		});
	}
	,
	handleClick: function (e) {
		this.props.onWeekChoice(Number(e.target.innerHTML));
	}
});

module.exports = Week;
