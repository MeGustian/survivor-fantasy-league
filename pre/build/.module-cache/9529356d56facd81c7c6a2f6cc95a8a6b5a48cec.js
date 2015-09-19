var Contestant = function (_id) {
	var getId = function () {
		return _id;
	};
}

Contestant.prototype.stringify = function (modifier) {
	modifier = modifier || {};
	var str;
	// Check for modifiers. For now we just return the id.
	str = this.getId();
	return str;
};

Contestant.prototype.fetch = function (what) {
	throw {
		fn: 'Contestant.prototype.fetch',
		instance: this,
		arguments: [what],
		details: "Still not programmed.\nI'm supposed to fetch from DB."
	};
};

module.exports = Contestant;
