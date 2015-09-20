var React = require('react');
var I = require('immutable');
var List = I.List;

var Week = React.createClass({
	render: function () {
		return (
			<nav>
				<ul className="pagination">
					{this.items()}
				</ul>
			</nav>
		);
	}
	,
	items: function () {
		var that = this;
		return List().setSize(that.props.count).map(function (empty, i) {
			var key = i+1;
			return (
				<li key={key}>
					<a href={"/admin/"+(key).toString()}>{key}</a>
				</li>
			)
		});
	}
});

module.exports = Week;
