var codes = {
	"Abi-Maria Gomes": {
		thumbnail: 'hwXOfa5',
		slide: ''
	}
};

/**
 * Translates a contestant name and size to an absolute url.
 * @param {string} name The contestant's name.
 * @return {string} the Url of the image.
 */
var sizeToNameToImgUrl = function (size) {
	var prefix = 'i.imgur.com/';
	var suffix = '.jpg';
	return function (name) {
		return prefix + codes[name][size] + suffix;
	}
};

module.exports = sizeToNameToImgUrl;
