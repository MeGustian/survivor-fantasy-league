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
			slide: 'HtA1rsL'
		},
		"Andrew Savage": {
			contestant: 'kaINUJx',
			slide: 'FcOhGUH'
		},
		"Ciera Eastin": {
			contestant: 'qSeTatq',
			slide: 'muSotkg'
		},
		"Jeff Varner": {
			contestant: 'fP0vhbn',
			slide: 'w8H2OZ8'
		},
		"Jeremy Collins": {
			contestant: 'UZ0fQ1Q',
			slide: 'CeuGLM3'
		},
		"Kelley Wentworth": {
			contestant: 'YAbIoZs',
			slide: 'M9NDaAp'
		},
		"Kelly Wiglesworth": {
			contestant: 'kPEL1hg',
			slide: 'HFhCDAI'
		},
		"Joe Anglim": {
			contestant: 'wmkLj0S',
			slide: 'Gl3q86V'
		},
		"Peih-Gee Law": {
			contestant: 'gXUjJIf',
			slide: 'Z52gwGU'
		},
		"Kass McQuillen": {
			contestant: 'UyWnr0R',
			slide: 'crUsEYI'
		},
		"Keith Nale": {
			contestant: 'sh1wzVU',
			slide: 'A0VIELi'
		},
		"Kimmi Kappenberg": {
			contestant: 'yqq23cF',
			slide: 'LLfPZw6'
		},
		"Monica Padilla": {
			contestant: 'sMjL9Ii',
			slide: 'QbHEoM7'
		},
		"Shirin Oskooi": {
			contestant: 'OGBz0Gy',
			slide: '8BBk0z0'
		},
		"Spencer Bledsoe": {
			contestant: 'srmXAnp',
			slide: 'p2BvnR8'
		},
		"Stephen Fishbach": {
			contestant: 'lLfWAhQ',
			slide: 'n4BgFwl'
		},
		"Tasha Fox": {
			contestant: 'FKM6qGw',
			slide: 'zlPOkS9'
		},
		"Terry Deitz": {
			contestant: '2DFBXXy',
			slide: 'v9PTsTy'
		},
		"Vytas Baskauskas": {
			contestant: 'qYXoO3s',
			slide: 'AM2Z7jc'
		},
		"Woo Hwang": {
			contestant: 'OYXuHVz',
			slide: '6ceNHzS'
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
