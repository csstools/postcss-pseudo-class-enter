var extend  = require('util')._extend;
var parser  = require('postcss-selector-parser');
var postcss = require('postcss');

module.exports = postcss.plugin('postcss-pseudo-class-enter', function (opts) {
	opts = extend({}, opts);

	var value   = ':' + (opts.prefix ? '-' + opts.prefix + '-' : '') + 'enter';
	var outline = 'outline' in opts ? opts.outline || '0' : false;

	// transform :enter selector to :focus, :hover
	var transform = function (selectors) {
		// define variables
		var node;
		var nodeIndex;
		var selector;
		var selectorFocus;
		var selectorHover;

		// define the selector index
		var selectorIndex = -1;

		// for each selector
		while (selector = selectors.nodes[++selectorIndex]) {
			// reset the node index
			nodeIndex = -1;

			// for each node
			while (node = selector.nodes[++nodeIndex]) {
				// if the node value matches the enter value
				if (node.value === value) {
					// clone the selector
					selectorFocus = selector.clone();
					selectorHover = selector.clone();

					// update the matching clone values
					selectorFocus.nodes[nodeIndex].value = ':focus';
					selectorHover.nodes[nodeIndex].value = ':hover';

					// replace the selector with the clones and roll back the selector index
					selectors.nodes.splice(selectorIndex--, 1, selectorHover, selectorFocus);

					// stop updating the selector
					break;
				}
			}
		}
	};

	return function (css) {
		return new Promise(function (resolve) {
			// walk each rule in the stylesheet
			css.walkRules(function (rule) {
				// parse the selector
				var selector = parser(transform).process(rule.selector).result;

				// if the selector has changed
				if (selector !== rule.selector) {
					// update the selector
					rule.selector = selector;

					// if an outline value has been defined
					if (outline) {
						// define no outline
						var noOutline = true;

						// check for outline declaration
						rule.walkDecls('outline', function () {
							return noOutline = false;
						});

						// if outline declaration does not exist
						if (noOutline) {
							// prepend the outline declaration to the rule
							rule.prepend({
								prop:  'outline',
								value: outline
							});
						}
					}
				}
			});

			resolve();
		});
	};
});
