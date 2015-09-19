var React = require('react');

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
		var arr = new Array(this.props.count);
		return arr.map(function (empty, i) {
			return (
				React.createElement("li", {onClick: that.handleClick, key: i}, React.createElement("a", {href: "#"}, "i"))
			)
		});
	}
	,
	handleClick: function () {
		this.props.onWeekChoice();
	}
});

var WeekItem = React.createClass({displayName: "WeekItem",
	render: function () {
		return React.createElement("li", {onclick: that.handleClick(i), key: i}, React.createElement("a", {href: "#"}, "i"))
	}
})

module.exports = Week;
