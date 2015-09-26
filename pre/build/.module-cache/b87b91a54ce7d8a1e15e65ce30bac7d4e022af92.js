var React = require('react');
var PropTypes = React.PropTypes;
var I = require('immutable');
var ImmutablePropTypes = require('react-immutable-proptypes');
// TODO: Do I need `bindActionCreators`? Should I use it?
var bindActionCreators = require('redux').bindActionCreators;
var ReactRedux = require('react-redux');
var connect = ReactRedux.connect; // Connect react container to redux.

// Components. // TODO: Add proptypes to components (in their files).
var Week = require('../components/Week'); // Explain...
var Tribes = require('../components/Tribes'); // Explain...
var Quiz = require('../components/Quiz'); // Explain...
var Questions = require('../components/Questions'); // Explain...
var Admin = require('../components/Admin'); // Explain...
var computerOfState = require('../helpers/compute-state');
var act = require('../actions'); // Give dispatch an action payload.
// Handle the phase between passportJS sign-in to when the page loads. will
// return false once everything is clear.
var userLoading = require('../helpers/user-loading');
var forcedLogger = require('../helpers/forced-logger');


var Fantasy = React.createClass({displayName: "Fantasy",
	render: function () {
		var p = this.props;
		forcedLogger(p);
		var now = Date.now();
		var computedState = computerOfState(p);
		console.log('Computing the state took: ' + (Date.now() - now) + 'ms.');
		var dispatch = p.dispatch;
		var fullContestants = p.week.get('contestantStatus').mergeDeep(p.contestants);
		var circumstances = {
			weekNumber: p.week.get('selected')
		};
		var whatIsLoading = userLoading(p.user, dispatch, act);
		if (whatIsLoading) {
			return whatIsLoading;
		}
		var serverFail = Object.getOwnPropertyNames(p).some(function (prop) {
			if (prop === 'dispatch') {
				return false;
			}
			return p[prop].get('error');
		});
		return (
			React.createElement("div", null, 
				React.createElement(Admin, {
					key: "admin", 
					user: p.user, 
					serverFail: serverFail, 
					createQuestion: function (type) {
						return dispatch(act.createQuestion(circumstances, type));
					}}
				), 
				React.createElement(Quiz, {
					key: "quiz", 
					user: p.user, 
					questions: p.questions, 
					contestants: fullContestants, 
					dispatcher: {
						userAnswer: function (questionId, answer) {
							return dispatch(act.userAnswer(circumstances, questionId, answer));
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
					key: "tribes", 
					user: p.user, 
					contestants: fullContestants, 
					scores: computedState.scores, 
					toggleAchievement: function (achievementCode, contestantId, hasAchieved) {
						return dispatch(act.toggleAchievement(circumstances, achievementCode, contestantId, hasAchieved));
					}}
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
