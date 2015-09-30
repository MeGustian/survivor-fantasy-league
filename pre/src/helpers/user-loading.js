var React = require('react');

module.exports = function (controller, dispatch, act) {
	if (controller.getIn(['error', 'is'])) {
		return <div className="alert alert-danger" role="alert">{"failed! " + controller.getIn(['error', 'details', 'messege'])}</div>;
	}
	if (controller.getIn(['user', 'attempting'])) {
		return <div className="alert alert-info" role="alert">{"loading..."}</div>;
	}
	if (!controller.getIn(['user', 'signedIn'])) {
		dispatch(act.getInitial());
		return <div className="alert alert-info" role="alert">{"signing in..."}</div>;
	}
	return false;
}
