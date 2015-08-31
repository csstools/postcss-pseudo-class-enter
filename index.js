var postcss = require('postcss');
var postcssSelectorParser = require('postcss-selector-parser');

module.exports = postcss.plugin('postcss-pseudo-class-enter', function (opts) {
	// cache the enter value
	var valueEnter = ':' + (opts && opts.prefix ? '-' + opts.prefix + '-' : '') + 'enter';

	return function (css) {
		// for each rule
		css.walkRules(function (rule) {
			// update the selector
			rule.selector = postcssSelectorParser(function (selectors) {
				// cache variables
				var node;
				var nodeIndex;
				var selector;
				var selectorFocus;
				var selectorHover;

				// cache the selector index
				var selectorIndex = -1;

				// for each selector
				while (selector = selectors.nodes[++selectorIndex]) {
					// reset the node index
					nodeIndex = -1;

					// for each node
					while (node = selector.nodes[++nodeIndex]) {
						// if the node value matches the enter value
						if (node.value === valueEnter) {
							// clone the selector
							selectorFocus = selector.clone();
							selectorHover = selector.clone();

							// update the matching clone values
							selectorFocus.nodes[nodeIndex].value = ':focus';
							selectorHover.nodes[nodeIndex].value = ':hover';

							// replace the selector with the clones and roll back the selector index
							selectors.nodes.splice(selectorIndex--, 1, selectorFocus, selectorHover);

							// stop updating the selector
							break;
						}
					}
				}
			}).process(rule.selector).result;
		});
	};
});
