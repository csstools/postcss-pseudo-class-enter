var postcss = require('postcss');
var expect  = require('chai').expect;

var plugin = require('../');

var test = function (input, output, opts, done) {
	postcss([ plugin(opts) ]).process(input).then(function (result) {
		expect(result.css).to.eql(output);
		expect(result.warnings()).to.be.empty;
		done();
	}).catch(function (error) {
		done(error);
	});
};

describe('postcss-pseudo-class-enter', function () {
	it(':enter transforms to :focus and :hover', function (done) {
		test('a:enter { background: yellow; }', 'a:focus, a:hover { background: yellow; }', {}, done);
	});

	it(':enter remains :enter { prefix: "postcss" }', function (done) {
		test('a:enter { background: yellow; }', 'a:enter { background: yellow; }', {
			prefix: 'postcss'
		}, done);
	});

	it(':-postcss-enter transforms to :focus and :hover { prefix: "postcss" }', function (done) {
		test('a:-postcss-enter { background: yellow; }', 'a:focus, a:hover { background: yellow; }', {
			prefix: 'postcss'
		}, done);
	});

});
