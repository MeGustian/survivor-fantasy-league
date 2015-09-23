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
var computerOfState = require('../compute-state');
var act = require('../actions'); // Give dispatch an action payload.
// TODO: Do I need `immutable`?
var I = require('immutable');
var ImmutablePropTypes = require('react-immutable-proptypes');


var Fantasy = React.createClass({displayName: "Fantasy",
	render: function () {
		console.groupCollapsed('rendering with...');
		// console.group('contestants');
		// 	console.log(this.props.contestants.toString());
		// console.groupEnd();
		// console.group('week');
		// 	console.log(this.props.week.toString());
		// console.groupEnd();
		// console.group('questions');
		// 	console.log(this.props.questions.toString());
		// console.groupEnd();
		// console.group('user');
		// 	console.log(this.props.user.toString());
		// console.groupEnd();
		console.group('compute-state');
			var computedState = computerOfState(this.props);
			console.log(computedState.scores.toString());
		console.groupEnd();
		console.groupEnd();
		var p = this.props;
		var dispatch = p.dispatch;
		var fullContestants = p.week.get('contestantStatus').mergeDeep(p.contestants);
		var circumstances = {
			weekNumber: p.week.get('selected')
		};
		// console.log(fullContestants.toString());
		// if (!p.user.get('userId')) {
		// 	return <SignIn user={p.user} submit={function (username, password, isAdmin) {
		// 		return dispatch(act.signIn(username, password, isAdmin));
		// 	}}/>
		// }
		if (p.user.get('error')) {
			return React.createElement("div", {className: "alert alert-danger", role: "alert"}, "failed!");
		}
		if (p.user.get('attempting')) {
			return React.createElement("div", {className: "alert alert-info", role: "alert"}, "loading...");
		}
		if (!p.user.get('signedIn')) {
			dispatch(act.getInitial());
			return React.createElement("div", {className: "alert alert-info", role: "alert"}, "signing in...");
		}
		return (
			React.createElement("div", null, 
				React.createElement(Week, {
					user: p.user, 
					selected: p.week.get('selected'), 
					count: p.week.get('count'), 
					key: "week", 
					onWeekChoice: function (number) {
						return dispatch(act.selectWeekView(circumstances, number));
					}}
				), 
				React.createElement(Questions, {
					user: p.user, 
					questions: p.questions, 
					contestants: fullContestants, 
					key: "questions", 
					dispatcher: {
						userAnswer: function (questionId, answer) {
							return dispatch(act.userAnswer(circumstances, questionId, answer));
						},
						create: function (type) {
							return dispatch(act.createQuestion(circumstances, type));
						},
						update: function (questionId, question, answer, type) {
							return dispatch(act.updateQuestion(circumstances, questionId, question, answer, type));
						},
						edit: function (questionId, isEditing) {
							return dispatch(act.editQuestion(questionId, isEditing));
						},
						remove: function (questionId) {
							return dispatch(act.removeQuestion(circumstances, questionId));
						}
					}}
				), 
				React.createElement(Tribes, {
					user: p.user, 
					contestants: fullContestants, 
					scores: {good: 20, bad: -20, total: 0}, 
					toggleAchievement: function (achievementCode, contestantId, hasAchieved) {
						return dispatch(act.toggleAchievement(circumstances, achievementCode, contestantId, hasAchieved));
					}, 
					key: "tribes"}
				)
			)
		);
	}
	,
	propTypes: {
		week: ImmutablePropTypes.contains({
			selected: PropTypes.number,
			count: PropTypes.number,
			contestantStatus: ImmutablePropTypes.mapOf(
				ImmutablePropTypes.contains({
					tribe: PropTypes.string.isRequired,
					votedFor: PropTypes.string.isRequired,
					achievements: ImmutablePropTypes.mapOf(PropTypes.bool).isRequired
				})
			)
		}).isRequired
		,
		contestants: ImmutablePropTypes.mapOf(
			ImmutablePropTypes.contains({
				firstName: PropTypes.string.isRequired,
				lastName: PropTypes.string.isRequired,
				age: PropTypes.string.isRequired,
				occupation: PropTypes.string.isRequired,
				previousSeason: PropTypes.string.isRequired,
				place: PropTypes.string.isRequired
			})
		).isRequired
		,
		questions: ImmutablePropTypes.mapOf(
			ImmutablePropTypes.contains({
				question: PropTypes.string.isRequired,
				answer: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
				type: PropTypes.string.isRequired
			})
		).isRequired
		,
		user: ImmutablePropTypes.contains({
			userId: PropTypes.string,
			isAdmin: PropTypes.bool,
			attempting: PropTypes.bool
		}).isRequired
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
