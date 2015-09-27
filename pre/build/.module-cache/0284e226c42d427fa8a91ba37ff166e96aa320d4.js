var codes = {
	"Abi-Maria Gomes": {
		contestant: 'hwXOfa5',
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
	// Uncomment 2 lines below if you wish to use local files.
	prefix = '/images/contestants/thumbnails/';
	suffix = '.jpg';
	return function (name) {
		return prefix + codes[name][size] + suffix;
	}
};

module.exports = sizeToNameToImgUrl;
