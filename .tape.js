module.exports = {
	'postcss-pseudo-class-enter': {
		'basic': {
			message: 'supports basic :enter'
		},
		'basic:outline-0': {
			message: 'supports { outline: 0 }',
			options: {
				outline: 0
			}
		},
		'basic:outline-1px-solid-white': {
			message: 'supports { outline: "1px solid white" }',
			options: {
				outline: '1px solid white'
			}
		},
		'basic.mixed': {
			message: 'supports basic mixed use'
		},
		'prefix': {
			message: 'supports { prefix: "x" }',
			options: {
				prefix: 'x'
			}
		},
		'prefix:outline-0': {
			message: 'supports { prefix: "x", outline: 0 }',
			options: {
				outline: 0,
				prefix: 'x'
			}
		},
		'prefix.mixed': {
			message: 'supports { prefix: "x" } mixed use',
			options: {
				prefix: 'x'
			}
		}
	}
};
