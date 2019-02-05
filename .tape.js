module.exports = {
	'basic': {
		message: 'supports basic usage'
	},
	'outline': {
		message: 'supports { outline } option',
		options: {
			outline: true
		}
	},
	'prefix': {
		message: 'supports { prefix } usage',
		options: {
			prefix: 'x'
		},
		expect: 'basic.expect.css',
		result: 'basic.result.css'
	}
};
