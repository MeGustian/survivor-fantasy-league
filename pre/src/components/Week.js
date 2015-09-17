var React = require('react');

var Week = React.createClass({
	render: function () {
		return (
			<div className="dropdown">
				<button className="btn btn-default dropdown-toggle" type="button" id="dropdownWeek" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
					{{this.props.index}}
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
		var arr = new Array(this.props.count);
		return arr.forEach(function (empty, i) {
			return (
				<li><a href="#">i</a></li>
			)
		})
	}
});

module.exports = Potential;
