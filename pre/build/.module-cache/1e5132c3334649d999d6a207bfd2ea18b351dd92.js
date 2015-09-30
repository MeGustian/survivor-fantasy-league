/**
 * Translates a contestant name and size to an absolute url.
 * @param {string} name The contestant's name.
 * @return {string} the Url of the image.
 */
var sizeToNameToImgUrl = function (size) {
	var prefix = 'http://i.imgur.com/';
	var suffix = '.jpg';
	var codes = {
		"Abi-Maria Gomes": {
			contestant: 'hwXOfa5',
			slide: undefined
		},
		"Andrew Savage": {
			contestant: 'kaINUJx',
			slide: undefined
		},
		"Ciera Eastin": {
			contestant: 'qSeTatq',
			slide: undefined
		},
		"Jeff Varner": {
			contestant: 'fP0vhbn',
			slide: undefined
		},
		"Jeremy Collins": {
			contestant: 'UZ0fQ1Q',
			slide: undefined
		},
		"Kelley Wentworth": {
			contestant: 'YAbIoZs',
			slide: undefined
		},
		"Kelly Wiglesworth": {
			contestant: 'kPEL1hg',
			slide: undefined
		},
		"Joe Anglim": {
			contestant: 'wmkLj0S',
			slide: undefined
		},
		"Peih-Gee Law": {
			contestant: 'gXUjJIf',
			slide: undefined
		},
		"Kass McQuillen": {
			contestant: 'UyWnr0R',
			slide: undefined
		},
		"Keith Nale": {
			contestant: 'sh1wzVU',
			slide: undefined
		},
		"Kimmi Kappenberg": {
			contestant: 'yqq23cF',
			slide: undefined
		},
		"Monica Padilla": {
			contestant: 'sMjL9Ii',
			slide: undefined
		},
		"Shirin Oskooi": {
			contestant: 'OGBz0Gy',
			slide: undefined
		},
		"Spencer Bledsoe": {
			contestant: 'srmXAnp',
			slide: undefined
		},
		"Stephen Fishbach": {
			contestant: 'lLfWAhQ',
			slide: undefined
		},
		"Tasha Fox": {
			contestant: 'FKM6qGw',
			slide: undefined
		},
		"Terry Deitz": {
			contestant: '2DFBXXy',
			slide: undefined
		},
		"Vytas Baskauskas": {
			contestant: 'qYXoO3s',
			slide: undefined
		},
		"Woo Hwang": {
			contestant: 'OYXuHVz',
			slide: undefined
		}
	};
	// Uncomment 2 lines below if you wish to use local files.
	// prefix = '/images/contestants/thumbnails/';
	// suffix = '.jpg';
	return function (name) {
		if (codes[name] && codes[name][size]) {
			return prefix + codes[name][size] + suffix;
		} else {
			return name + suffix; // This fallback doesn't really exist.
		}
	}
};

module.exports = sizeToNameToImgUrl;
