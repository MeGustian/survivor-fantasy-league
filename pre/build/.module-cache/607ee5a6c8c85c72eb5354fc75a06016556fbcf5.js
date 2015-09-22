var React = require('react');
var I = require('immutable');
var List = I.List;

var Week = React.createClass({displayName: "Week",
	render: function () {
		return (
			React.createElement("nav", null, 
				React.createElement("ul", {className: "pagination"}, 
					this.items()
				)
			)
		);
	}
	,
	items: function () {
		var that = this;
		return List().setSize(that.props.count).map(function (empty, i) {
			var number = i+1;
			return (
				React.createElement("li", {onClick: that.onWeekChoice.bind(null, number), key: number, className: (that.props.selected === number) ? "active" : ""}, 
					React.createElement("a", null, number)
				)
			);
		});
	}
	,
	onWeekChoice: function (number) {
		this.props.onWeekChoice(number);
	}
});

module.exports = Week;
