/**
 * Translates a contestant name and size to an absolute url.
 * @param {string} name The contestant's name.
 * @param {string} size The size-class.
 * @return {string} the Url of the image.
 */
var nameToImgUrl = function (name, size) {
	var prefix = 'i.imgur.com/';
	var suffix = '.jpg';
	var codes = {
		"Abi-Maria Gomes": {
			"thumbnail": 'hwXOfa5',
			"slide": ''
		}
	};
	return prefix + codes[name][size] + suffix;
};

module.exports = nameToImgUrl;
