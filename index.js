// tooling
const postcss = require('postcss');
const parser = require('postcss-selector-parser');

// plugin
module.exports = postcss.plugin('postcss-pseudo-class-enter', ({
	outline = false,
	prefix = ''
}) => {
	// prefixed node value
	const value = `:${ prefix ? `-${ prefix }-` : '' }enter`;

	// transform :enter selector to :focus, :hover
	const transform = (selectors) => {
		// for each selector
		for (let selector of selectors.nodes) {
			// for each node
			for (let node of selector.nodes) {
				// if the node value matches the enter value
				if (node.value === value) {
					// update the matching values
					node.value = ':hover';

					selectors.insertBefore(selector, selector.clone());

					node.value = ':focus';

					// stop updating the selector
					break;
				}
			}
		}
	};

	return (css) => {
		// walk each rule in the stylesheet
		css.walkRules((rule) => {
			// parse the selector
			let selector = parser(transform).process(rule.selector).result;

			// if the selector has changed
			if (selector !== rule.selector) {
				// update the selector
				rule.selector = selector;

				// if an outline value has been defined
				if (outline !== false) {
					// define no outline
					let noOutline = true;

					// check for outline declaration
					rule.walkDecls('outline', () => {
						noOutline = false;

						return false;
					});

					// if outline declaration does not exist
					if (noOutline) {
						// prepend the outline declaration to the rule
						rule.prepend({
							prop:  'outline',
							value: outline || 0
						});
					}
				}
			}
		});
	};
});
