var React = require('react');
var I = require('immutable');
var List = I.List;

var Week = React.createClass({
	render: function () {
		return (
			<nav>
				<ul className="pagination">
					<li key="previous">
						<a href="#" aria-label="Previous">
							<span aria-hidden="true">&laquo;</span>
						</a>
					</li>
					{this.items()}
					<li key="next">
						<a href="#" aria-label="Next">
							<span aria-hidden="true">&raquo;</span>
						</a>
					</li>
				</ul>
			</nav>
			<div className="dropdown">
				<button className="btn btn-default dropdown-toggle" type="button" id="dropdownWeek" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
					<span>Week</span>
					<span className="caret"></span>
				</button>
				<ul className="dropdown-menu" aria-labelledby="dropdownWeek">
					{this.items()}
				</ul>
			</div>
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
