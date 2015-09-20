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
		return this.props.questions.map(function (id, content) {
			return (
				React.createElement(Question, {
					key: id, 
					questionContent: content}
				)

			);
		});
	}
	,
	membersOf: function (tribe) {
		var that = this;
		return tribe.map(function (val) {
			var contestant = val.get('contestant');
			// var achievements = val.get('achievements');
			var achievements = that.props.achievements.get(contestant);
			return (
				React.createElement(Contestant, {
					contestantId: contestant, 
					achievements: achievements, 
					toggleAchievement: that.props.toggleAchievement, 
					key: contestant}
				)
			);
		});
	}
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
					React.createElement("div", {className: "panel-heading"}, this.props.content.question), 
					React.createElement("div", {className: "panel-body"}, 
						this.bodyRender()
					)
				)
			)
		);
	}
	,
	bodyRender: function () {
		var type = this.props.content.type;

	}
})

module.exports = Questions;
