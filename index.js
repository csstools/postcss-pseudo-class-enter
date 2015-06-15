var postcss = require('postcss');

module.exports = postcss.plugin('postcss-pseudo-class-enter', function (opts) {
	var match = new RegExp(':' + (opts && opts.prefix ? '-' + opts.prefix + '-' : '') + 'enter\\b', 'g');

	return function (css) {
		css.eachRule(function (rule) {
			if (match.test(rule.selector)) {
				rule.selector = ['focus', 'hover'].map(function (replacement) {
					return rule.selector.replace(match, ':' + replacement);
				}).join(', ');
			}
		});
	};
});
