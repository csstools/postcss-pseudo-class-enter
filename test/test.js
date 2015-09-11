var path    = require('path');
var postcss = require('postcss');
var expect  = require('chai').expect;
var fs      = require('fs');

var plugin = require('../');

function test(name, opts, done) {
	var fixtureDir = './test/fixtures/';
	var baseName   = name.split(':')[0];
	var testName   = name.split(':').join('.');
	var inputPath  = path.resolve(fixtureDir + baseName + '.css');
	var actualPath = path.resolve(fixtureDir + testName + '.actual.css');
	var expectPath = path.resolve(fixtureDir + testName + '.expect.css');

	var inputCSS  = fs.readFileSync(inputPath, 'utf8');
	var expectCSS = fs.readFileSync(expectPath, 'utf8');

	postcss([plugin(opts)]).process(inputCSS, {
		from: inputPath
	}).then(function (result) {
		var actualCSS = result.css;

		fs.writeFileSync(actualPath, actualCSS);

		expect(actualCSS).to.eql(expectCSS);
		expect(result.warnings()).to.be.empty;

		done();
	}).catch(function (error) {
		done(error);
	});
}

describe('postcss-pseudo-class-enter', function () {
	it(':enter', function (done) {
		test('enter', {}, done);
	});

	it(':enter { prefix: "x" }', function (done) {
		test('enter:prefix-x', { prefix: 'x' }, done);
	});

	it(':enter (mixed usage)', function (done) {
		test('mixed', {}, done);
	});

	it(':enter (mixed usage) { prefix: "x" }', function (done) {
		test('mixed:prefix-x', { prefix: 'x' }, done);
	});

	it(':enter { outline: 0 }', function (done) {
		test('enter:outline-0', { outline: 0 }, done);
	});

	it(':enter { outline: "1px solid white" }', function (done) {
		test('enter:outline-1px-solid-white', { outline: '1px solid white' }, done);
	});

	it(':x-enter', function (done) {
		test('x-enter', {}, done);
	});

	it(':x-enter { prefix: "x" }', function (done) {
		test('x-enter:prefix-x', { prefix: 'x' }, done);
	});

	it(':x-enter { outline: 0, prefix: "x" }', function (done) {
		test('x-enter:outline-0-prefix-x', { outline: 0, prefix: 'x' }, done);
	});
});
