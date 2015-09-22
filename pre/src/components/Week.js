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
			var number = i+1;
			return (
				<li onClick={that.onWeekChoice.bind(null, number)} key={number} className={(that.props.selected === number) ? "active" : ""}>
					<a>{number}</a>
				</li>
			);
		});
	}
	,
	onWeekChoice: function (number) {
		this.props.onWeekChoice(number);
	}
});

module.exports = Week;
