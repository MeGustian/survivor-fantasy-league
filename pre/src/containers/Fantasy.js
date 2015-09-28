var React = require('react');
var PropTypes = React.PropTypes;
var I = require('immutable');
var ImmutablePropTypes = require('react-immutable-proptypes');
// TODO: Do I need `bindActionCreators`? Should I use it?
var bindActionCreators = require('redux').bindActionCreators;
var connect = require('react-redux').connect; // Connect react container to redux.

// Components. // TODO: Add proptypes to components (in their files).
var Navigation = require('../components/Navigation'); // Explain...
var Profile = require('../components/Profile'); // Explain...
var Tribes = require('../components/Tribes'); // Explain...
var Quiz = require('../components/Quiz'); // Explain...
var Admin = require('../components/Admin'); // Explain...
var act = require('../actions'); // Give dispatch an action payload.
// Handle the phase between passportJS sign-in to when the page loads. will
// return false once everything is clear.
var computerOfState = require('../helpers/compute-state');
var userLoading = require('../helpers/user-loading');
var forcedLogger = require('../helpers/forced-logger');


var Fantasy = React.createClass({
	propTypes: {
		controller: ImmutablePropTypes.contains({
			user: ImmutablePropTypes.contains({
				signedIn: PropTypes.bool.isRequired,
				attempting: PropTypes.bool.isRequired,
				isAdmin: PropTypes.bool.isRequired
			}),
			error: ImmutablePropTypes.contains({
				is: PropTypes.bool.isRequired,
				details: ImmutablePropTypes.contains({
					action: PropTypes.string,
					details: PropTypes.string
				})
			})
		})
		,
		navigation: ImmutablePropTypes.contains({
			location: PropTypes.string.isRequired,
			selectedWeek: PropTypes.string.isRequired,
			weekCount: PropTypes.string.isRequired
		}).isRequired
		,
		profile: ImmutablePropTypes.contains({
			chosen: ImmutablePropTypes.set.isRequired
		}).isRequired
		,
		contestants: ImmutablePropTypes.mapOf(
			ImmutablePropTypes.contains({
				firstName: PropTypes.string.isRequired,
				lastName: PropTypes.string.isRequired,
				age: PropTypes.string.isRequired,
				occupation: PropTypes.string.isRequired,
				previousSeason: PropTypes.string.isRequired,
				place: PropTypes.string.isRequired,
				weeks: ImmutablePropTypes.mapOf(
					ImmutablePropTypes.contains({
						tribe: PropTypes.string,
						votedFor: PropTypes.string,
						achievements: ImmutablePropTypes.mapOf(PropTypes.bool)
					})
				)
			})
		)
		,
		questions: ImmutablePropTypes.mapOf(
			ImmutablePropTypes.contains({
				question: PropTypes.string.isRequired,
				answer: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
				type: PropTypes.string.isRequired
			})
		).isRequired
	}
	,
	render: function () {
		var p = this.props;
		forcedLogger(p);
		var dispatch = p.dispatch;
		var whatIsLoading = userLoading(p.controller, dispatch, act);
		if (whatIsLoading) {
			return whatIsLoading;
		}
		var computedState = computerOfState(p);
		var circumstances = {
			weekNumber: p.navigation.get('selectedWeek')
		};
		return (
			<div>
				<Navigation
					key="navigation"
					user={p.controller.get('user')}
					navigation={p.navigation}
					navigate={function (target) {
						return dispatch(act.navigate(target));
					}}
				/>
				<Admin
					key="admin"
					user={p.controller.get('user')}
					serverFail={p.controller.get('error')}
					createQuestion={function (type) {
						return dispatch(act.createQuestion(circumstances, type));
					}}
				/>
				<div style={{display: p.navigation.get('location') === 'profile' ? 'initial' : 'none'}}>
				<Profile
					key="profile"
					user={p.controller.get('user')}
					chosen={p.profile.get('chosen')}
					submittedChoices={p.profile.get('submittedChoices')}
					submit={function (choices) {
						return dispatch(act.submitChoices(choices));
					}}
					info={p.contestants}
					selector={function (id) {
						return dispatch(act.chooseContestant(id));
					}}
				/>
				</div>
				<div style={{display: p.navigation.get('location') === 'weekly' ? 'initial' : 'none'}}>
				<Quiz
					key="quiz"
					user={p.controller.get('user')}
					open={p.navigation.get('selectedWeek') === p.navigation.get('weekCount')}
					questions={p.questions.filter(function (q, id) {return q.get('weekNumber') === p.navigation.get('selectedWeek')})}
					contestants={p.contestants}
					dispatcher={{
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
				/>
				<Tribes
					key="tribes"
					user={p.controller.get('user')}
					weekNumber={p.navigation.get('selectedWeek')}
					contestants={p.contestants}
					scores={computedState.scores}
					toggleAchievement={function (achievementCode, contestantId, hasAchieved) {
						return dispatch(act.toggleAchievement(circumstances, achievementCode, contestantId, hasAchieved));
					}}
				/>
				</div>
			</div>
		);
	}
});

// The function `connect` takes a function as argument for
// currying, which dictates how to select properties from
// the state.
var select = function (state) {
	return {
		controller: state.controller,
		navigation: state.navigation,
		profile: state.profile,
		contestants: state.contestants,
		questions: state.questions
	}
};

module.exports = connect(select)(Fantasy);
