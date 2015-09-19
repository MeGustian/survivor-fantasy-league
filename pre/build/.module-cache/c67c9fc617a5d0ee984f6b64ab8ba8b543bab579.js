var React = require('react');
var PropTypes = React.PropTypes;
// TODO: Do I need `bindActionCreators`? Should I use it?
var bindActionCreators = require('redux').bindActionCreators;
var ReactRedux = require('react-redux');
var connect = ReactRedux.connect; // Connect react container to redux.
// TODO: Add proptypes to components (in their files).
var Week = require('../components/Week'); // Explain...
var Tribes = require('../components/Tribes'); // Explain...
// var Questions = require('../components/Questions'); // Explain...
var act = require('../actions'); // Give dispatch an action payload.
var dummyDB = require('../dummyDB'); // The dummy for a JSON database.
// TODO: Do I need `immutable`?
var I = require('immutable');
var ImmutablePropTypes = require('react-immutable-proptypes');
console.log(ImmutablePropTypes);

var Fantasy = React.createClass({displayName: "Fantasy",
	render: function () {
		var p = this.props;
		var dispatch = p.dispatch;
		return (
			React.createElement("div", null, 
				React.createElement(Week, {
					index: p.week.get('selected'), 
					weekCount: p.week.get('count'), 
					key: "week", 
					onWeekChoice: function (index) {
						return dispatch(act.selectWeekView(index));
					}}
				), 
				React.createElement(Tribes, {
					content: p.tribes, 
					key: "tribes", 
					onSetTribe: function (tribes) {
						return dispatch(act.setTribes(tribes));
					}}
				)
			)
		);
	}
	// <Questions
	// 	content={p.questions}
	// 	key="questions"
	// 	onAnswer={function (qAndA) {
	// 		return dispatch(act.answer(qAndA));
	// 	}}
	// />
	,
	propTypes: {
		week: ImmutablePropTypes.map.isRequired
		,
		tribes: ImmutablePropTypes.map.isRequired
		,
		questions: ImmutablePropTypes.map.isRequired
	}
});

// The function `connect` takes a function as argument for
// currying, which dictates how to select properties from
// the state.
var select = function (state) {
	return {
		week: state.week
		,
		tribes: state.tribes
		,
		questions: state.questions
	}
};

module.exports = connect(select)(Fantasy);
