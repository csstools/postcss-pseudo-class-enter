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
		test('ul a:enter > span { background: yellow; }', 'ul a:focus > span, ul a:hover > span { background: yellow; }', {}, done);
	});

	it(':enter remains :enter { prefix: "foo" }', function (done) {
		test('ul a:enter > span { background: yellow; }', 'ul a:enter > span { background: yellow; }', {
			prefix: 'foo'
		}, done);
	});

	it(':-foo-enter transforms to :focus and :hover { prefix: "foo" }', function (done) {
		test('ul a:-foo-enter > span { background: yellow; }', 'ul a:focus > span, ul a:hover > span { background: yellow; }', {
			prefix: 'foo'
		}, done);
	});
});
