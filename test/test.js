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
		test(':enter { background: blue; }', ':hover,:focus { background: blue; }', {}, done);
	});

	it(':enter, ul a:enter > span', function (done) {
		test(':enter, ul a:enter > span { background: blue; }', ':hover,:focus, ul a:hover > span, ul a:focus > span { background: blue; }', {}, done);
	});

	it(':enter :enter', function (done) {
		test(':enter :enter { background: blue; }', ':hover :hover,:hover :focus,:focus :hover,:focus :focus { background: blue; }', {}, done);
	});

	// custom prefix tests
	it(':enter (with "foo" prefix)', function (done) {
		test(':enter { background: blue; }', ':enter { background: blue; }', { prefix: 'foo' }, done);
	});

	it(':-foo-enter (with no prefix)', function (done) {
		test(':-foo-enter { background: blue; }', ':-foo-enter { background: blue; }', {}, done);
	});

	it(':-foo-enter (with "foo" prefix)', function (done) {
		test(':-foo-enter { background: blue; }', ':hover,:focus { background: blue; }', { prefix: 'foo' }, done);
	});

	it(':-foo-enter, ul a:-foo-enter > span (with "foo" prefix)', function (done) {
		test(':-foo-enter, ul a:-foo-enter > span { background: blue; }', ':hover,:focus, ul a:hover > span, ul a:focus > span { background: blue; }', { prefix: 'foo' }, done);
	});

	it(':-foo-enter :-foo-enter (with "foo" prefix)', function (done) {
		test(':-foo-enter :-foo-enter { background: blue; }', ':hover :hover,:hover :focus,:focus :hover,:focus :focus { background: blue; }', { prefix: 'foo' }, done);
	});

	// removed focus outline tests
	it(':enter (with removed focus outline)', function (done) {
		test(':enter { background: blue; }', ':focus,:hover { outline: 0; background: blue; }', { removeFocusOutline: true }, done);
	});

	it(':enter, ul a:enter > span (with removed focus outline)', function (done) {
		test(':enter, ul a:enter > span { background: blue; }', ':focus,:hover, ul a:focus > span, ul a:hover > span { outline: 0; background: blue; }', { removeFocusOutline: true }, done);
	});

	it(':enter :enter (with removed focus outline)', function (done) {
		test(':enter :enter { background: blue; }', ':focus :focus,:focus :hover,:hover :focus,:hover :hover { outline: 0; background: blue; }', { removeFocusOutline: true }, done);
	});

	it(':enter (with "foo" prefix, with removed focus outline)', function (done) {
		test(':enter { background: blue; }', ':enter { background: blue; }', { prefix: 'foo', removeFocusOutline: true }, done);
	});

	it(':-foo-enter (with no prefix, with removed focus outline)', function (done) {
		test(':-foo-enter { background: blue; }', ':-foo-enter { background: blue; }', { removeFocusOutline: true }, done);
	});

	it(':-foo-enter (with "foo" prefix, with removed focus outline)', function (done) {
		test(':-foo-enter { background: blue; }', ':focus,:hover { outline: 0; background: blue; }', { prefix: 'foo', removeFocusOutline: true }, done);
	});

	it(':-foo-enter, ul a:-foo-enter > span (with "foo" prefix, with removed focus outline)', function (done) {
		test(':-foo-enter, ul a:-foo-enter > span { background: blue; }', ':focus,:hover, ul a:focus > span, ul a:hover > span { outline: 0; background: blue; }', { prefix: 'foo', removeFocusOutline: true }, done);
	});

	it(':-foo-enter :-foo-enter (with "foo" prefix, with removed focus outline)', function (done) {
		test(':-foo-enter :-foo-enter { background: blue; }', ':focus :focus,:focus :hover,:hover :focus,:hover :hover { outline: 0; background: blue; }', { prefix: 'foo', removeFocusOutline: true }, done);
	});
});
