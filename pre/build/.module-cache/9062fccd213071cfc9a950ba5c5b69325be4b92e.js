var React = require('react');

var AnswerTypes = {};

AnswerTypes.Contestants = React.createClass({displayName: "Contestants",
	render: function () {
		React.createElement("div", {className: "row"}, 
			this.thumbnails()
		)
	}
	,
	thumbnails: function () {
		var that = this;
		return React.createElement("div", null)
		// return this.props.tribes.map(function (contestant, id) {
		// 	var name = contestant.get('firstName') + " " + contestant.get('lastName');
		// 	return (
		// 		<div className="col-xs-4 col-md-2" key={id}>
		// 			<a>
		// 				<img
		// 					style={{marginRight: '0.25em', width: '40px', height: '40px'}}
		// 					src={"/images/contestants/" + name + ".jpg"}
		// 					alt={name}
		// 				/>
		// 				{name}
		// 			</a>
		// 		</div>
		// 	);
		// });
	}
});

module.exports = AnswerTypes;
