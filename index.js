var postcss = require('postcss');

module.exports = postcss.plugin('postcss-pseudo-class-enter', function (opts) {
	// options
	opts = typeof opts === 'object' ? opts : {};

	// prefix
	opts.prefix = opts.prefix ? '-' + opts.prefix + '-' : '';

	// regex
	var pseudoElementRegExp = new RegExp(':' + opts.prefix + 'enter\\b', 'g');

	// plugin
	return function (css) {
		// for each rule
		css.eachRule(function (rule) {
			// if the selector contains :enter
			if (pseudoElementRegExp.test(rule.selector)) {
				// replace :enter with :focus and :hover
				rule.selector = ['focus', 'hover'].map(function (pseudoElement) {
					return rule.selector.replace(pseudoElementRegExp, ':' + pseudoElement);
				}).join(', ');
			}
		});
	};
});
