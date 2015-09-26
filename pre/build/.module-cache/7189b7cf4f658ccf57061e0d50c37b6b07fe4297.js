var React = require('react');

module.exports = function (user, dispatch, act) {
	if (user.get('error')) {
		return React.createElement("div", {className: "alert alert-danger", role: "alert"}, "failed!");
	}
	if (user.get('attempting')) {
		return React.createElement("div", {className: "alert alert-info", role: "alert"}, "loading...");
	}
	if (!user.get('signedIn')) {
		dispatch(act.getInitial());
		return React.createElement("div", {className: "alert alert-info", role: "alert"}, "signing in...");
	}
	return false;
}
