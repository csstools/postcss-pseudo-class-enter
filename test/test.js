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
	// standard tests
	it(':enter', function (done) {
		test(':enter { background: blue; }', ':focus,:hover { background: blue; }', {}, done);
	});

	it(':enter, ul a:enter > span', function (done) {
		test(':enter, ul a:enter > span { background: blue; }', ':focus,:hover, ul a:focus > span, ul a:hover > span { background: blue; }', {}, done);
	});

	it(':enter :enter', function (done) {
		test(':enter :enter { background: blue; }', ':focus :focus,:focus :hover,:hover :focus,:hover :hover { background: blue; }', {}, done);
	});

	// custom prefix tests
	it(':enter (with "foo" prefix)', function (done) {
		test(':enter { background: blue; }', ':enter { background: blue; }', { prefix: 'foo' }, done);
	});

	it(':-foo-enter (with no prefix)', function (done) {
		test(':-foo-enter { background: blue; }', ':-foo-enter { background: blue; }', {}, done);
	});

	it(':-foo-enter (with "foo" prefix)', function (done) {
		test(':-foo-enter { background: blue; }', ':focus,:hover { background: blue; }', { prefix: 'foo' }, done);
	});

	it(':-foo-enter, ul a:-foo-enter > span (with "foo" prefix)', function (done) {
		test(':-foo-enter, ul a:-foo-enter > span { background: blue; }', ':focus,:hover, ul a:focus > span, ul a:hover > span { background: blue; }', { prefix: 'foo' }, done);
	});

	it(':-foo-enter :-foo-enter (with "foo" prefix)', function (done) {
		test(':-foo-enter :-foo-enter { background: blue; }', ':focus :focus,:focus :hover,:hover :focus,:hover :hover { background: blue; }', { prefix: 'foo' }, done);
	});
});
