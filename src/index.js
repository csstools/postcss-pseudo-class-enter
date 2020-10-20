import parser from 'postcss-selector-parser';

const plugin = opts => {
	// add conditional prefix
	const pseudoClass = `:${Object(opts).prefix ? `-${opts.prefix}-` : ''}enter`;
	const pseudoClassRegExp = new RegExp(pseudoClass, 'i');

	// add outline declaration
	const shouldUseOutline = Object(opts).outline !== null && Object(opts).outline !== undefined;

	return {
		postcssPlugin: 'postcss-pseudo-class-enter',
		Once: root => {
			// transform :enter selectors to :focus and :hover
			root.walkRules(pseudoClassRegExp, rule => {
				const originalSelector = rule.selector;

				const modifiedSelector = parser(selectors => {
					transform(selectors, pseudoClass);
				}).processSync(originalSelector);

				if (originalSelector !== modifiedSelector) {
					rule.selector = modifiedSelector;
				}

				if (shouldUseOutline) {
					// check for an existing outline declaration
					const hasOutline = rule.nodes.some(decl => decl.prop === 'outline');

					// if an outline declaration does not exist, prepend it
					if (!hasOutline) {
						const outlineValue = !opts.outline || opts.outline === true ? 0 : opts.outline;

						rule.prepend({ prop: 'outline', value: outlineValue });
					}
				}
			});
		}
	};
}
plugin.postcss = true;

export default plugin;

function transform(selectors, pseudoClass) {
	selectors.walk(selector => {
		if (selector.type === 'pseudo' && selector.value === pseudoClass) {
			// patch :hover pseudo
			selector.value = ':hover';

			const selectorsClone = selectors.clone().empty();
			const selectorParentClone = selector.parent.clone();
			selectorsClone.append(selectorParentClone);

			transform(selectorsClone, pseudoClass);

			selectors.insertBefore(selector, selectorParentClone);

			// patch :focus pseudo
			selector.value = ':focus';
		}
	});
}
