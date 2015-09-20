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
			var key = i+1;
			return (
				React.createElement("li", {key: key, className: (that.props.index === key) ? "active" : ""}, 
					React.createElement("a", {href: "/" + that.props.user.get('userId') + "/"+(key).toString()}, key)
				)
			);
		});
	}
});

module.exports = Week;
