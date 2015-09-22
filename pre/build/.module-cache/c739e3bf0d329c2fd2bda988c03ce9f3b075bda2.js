var React = require('react');
var PropTypes = React.PropTypes;
// TODO: Do I need `bindActionCreators`? Should I use it?
var bindActionCreators = require('redux').bindActionCreators;
var ReactRedux = require('react-redux');
var connect = ReactRedux.connect; // Connect react container to redux.
// TODO: Add proptypes to components (in their files).
var SignIn = require('../components/SignIn'); // Explain...
var Week = require('../components/Week'); // Explain...
var Tribes = require('../components/Tribes'); // Explain...
var Questions = require('../components/Questions'); // Explain...
var act = require('../actions'); // Give dispatch an action payload.
// TODO: Do I need `immutable`?
var I = require('immutable');
var ImmutablePropTypes = require('react-immutable-proptypes');

var Fantasy = React.createClass({displayName: "Fantasy",
	render: function () {
		var p = this.props;
		var dispatch = p.dispatch;
		var fullContestants = p.week.get('contestantStatus').mergeDeep(p.contestants);
		if (!p.user.get('userId')) {
			return React.createElement(SignIn, {user: p.user, submit: function (username, password, isAdmin) {
				return dispatch(act.signIn(username, password, isAdmin));
			}})
		}
		return (
			React.createElement("div", null, 
				React.createElement(Week, {
					user: p.user, 
					index: p.week.get('selected'), 
					count: p.week.get('count'), 
					key: "week", 
					onWeekChoice: function (index) {
						return dispatch(act.selectWeekView(index));
					}}
				), 
				React.createElement(Questions, {
					user: p.user, 
					questions: p.questions, 
					contestants: fullContestants, 
					key: "questions", 
					dispatcher: {
						userAnswer: function (questionId, answer) {
							return dispatch(act.userAnswer(questionId, answer));
						},
						create: function (questionId, answer) {
							return dispatch(act.createQuestion(questionId, answer));
						},
						update: function (questionId, question, answer, type) {
							return dispatch(act.updateQuestion(questionId, question, answer, type));
						},
						edit: function (questionId, isEditing) {
							return dispatch(act.editQuestion(questionId, isEditing));
						},
						remove: function (questionId) {
							return dispatch(act.removeQuestion(questionId));
						}
					}}
				), 
				React.createElement(Tribes, {
					user: p.user, 
					contestants: fullContestants, 
					achievements: p.achievements, 
					toggleAchievement: function (achievementCode, contestantId) {
						return dispatch(act.toggleAchievement(achievementCode, contestantId));
					}, 
					key: "tribes"}
				)
			)
		);
	}
	,
	propTypes: {
		week: ImmutablePropTypes.map.isRequired
		,
		contestants: ImmutablePropTypes.map.isRequired
		,
		questions: ImmutablePropTypes.map.isRequired
		,
		user: ImmutablePropTypes.map.isRequired
	}
});

// The function `connect` takes a function as argument for
// currying, which dictates how to select properties from
// the state.
var select = function (state) {
	return {
		week: state.week
		,
		contestants: state.contestants
		,
		questions: state.questions
		,
		user: state.user
	}
};

module.exports = connect(select)(Fantasy);
