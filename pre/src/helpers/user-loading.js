var React = require('react');

module.exports = function (user, dispatch, act) {
	if (user.get('error')) {
		return <div className="alert alert-danger" role="alert">{"failed!"}</div>;
	}
	if (user.get('attempting')) {
		return <div className="alert alert-info" role="alert">{"loading..."}</div>;
	}
	if (!user.get('signedIn')) {
		dispatch(act.getInitial());
		return <div className="alert alert-info" role="alert">{"signing in..."}</div>;
	}
	return false;
}
