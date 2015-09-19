var React = require('react');
var I = require('immutable');
var List = I.List;

var Week = React.createClass({
	render: function () {
		return (
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
			return (
				<li key={i+1}><a href={"/admin/week/"+(i+1).toString()}>{i+1}</a></li>
			)
		});
	}
	,
	handleClick: function (e) {
		this.props.onWeekChoice(Number(e.target.innerHTML));
	}
});

module.exports = Week;
