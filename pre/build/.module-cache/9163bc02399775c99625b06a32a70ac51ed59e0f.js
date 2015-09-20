var React = require('react');

var Questions = React.createClass({displayName: "Questions",
	render: function () {
		var style = {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'flex-start',
			alignItems: 'center'
		};
		return (
			React.createElement("div", {className: "questions-container", style: style}, 
				this.questions()
			)
		);
	}
	,
	questions: function () {
		return this.props.questions.map(function (content, id) {
			return (
				React.createElement(Question, {
					key: id, 
					content: content}
				)

			);
		});
	}
	// ,
	// membersOf: function (tribe) {
	// 	var that = this;
	// 	return tribe.map(function (val) {
	// 		var contestant = val.get('contestant');
	// 		// var achievements = val.get('achievements');
	// 		var achievements = that.props.achievements.get(contestant);
	// 		return (
	// 			<Contestant
	// 				contestantId={contestant}
	// 				achievements={achievements}
	// 				toggleAchievement={that.props.toggleAchievement}
	// 				key={contestant}
	// 			/>
	// 		);
	// 	});
	// }
});

var Question = React.createClass({displayName: "Question",
	render: function () {
		var style = {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-around',
			alignItems: 'baseline'
		};
		return (
			React.createElement("div", {className: "question", style: style}, 
				React.createElement("div", {className: "panel panel-default"}, 
					React.createElement("div", {className: "panel-heading"}, this.props.content.get('question')), 
					React.createElement("div", {className: "panel-body"}, 
						this.bodyRender()
					)
				)
			)
		);
	}
	,
	bodyRender: function () {
		var type = this.props.content.get('type');
		switch (type) {
			case 'boolean':
				var yes = this.props.content.get('answer') ? " active" : "";
				var no = !this.props.content.get('answer') ? " active" : "";
				return (
					React.createElement("div", {className: "btn-group btn-group-lg", role: "group"}, 
						React.createElement("button", {type: "button", className: "btn btn-success" + yes}, "Yes"), 
						React.createElement("button", {type: "button", className: "btn btn-danger" + no}, "No")
					)
				);
			case 'contestant':
				return (
					React.createElement("div", {className: "btn-group btn-group-lg", role: "group"}, 
						React.createElement("button", {type: "button", className: "btn btn-default"}, "Nobody"), 
						React.createElement("button", {type: "button", className: "btn btn-default dropdown-toggle", "data-toggle": "dropdown", "aria-haspopup": "true", "aria-expanded": "false"}, 
							"Somebody", 
							React.createElement("span", {className: "caret"})
						), 
						React.createElement("ul", {className: "dropdown-menu"}, 
							this.answerContestants()
						)
					)
				)
			default:
				return React.createElement("div", null, "Bad type specified")
		}
	}
})

module.exports = Questions;
