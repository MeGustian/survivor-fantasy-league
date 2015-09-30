var React = require('react');

module.exports = function (controller, dispatch, act) {
	if (controller.getIn(['error', 'is'])) {
		return React.createElement("div", {className: "alert alert-danger", role: "alert"}, "failed! " + controller.getIn(['error', 'details', 'messege']));
	}
	if (controller.getIn(['user', 'attempting'])) {
		return React.createElement("div", {className: "alert alert-info", role: "alert"}, "loading...");
	}
	if (!controller.getIn(['user', 'signedIn'])) {
		dispatch(act.getInitial());
		return React.createElement("div", {className: "alert alert-info", role: "alert"}, "signing in...");
	}
	return false;
}
