# PostCSS Pseudo-Class Enter [![Build Status][ci-img]][ci]

<img align="right" width="135" height="95" src="http://postcss.github.io/postcss/logo-leftp.png" title="Philosopher’s stone, logo of PostCSS">

[PostCSS Pseudo-Class Enter] is a [PostCSS] plugin that transforms the proposed `:enter` pseudo-class into `:focus` and `:hover`.

```css
nav a:enter {
	background-color: yellow;
}
```

```css
nav a:focus,
nav a:hover {
	background-color: yellow;
}
```

## Usage

You just need to follow these two steps to use [PostCSS Pseudo-Class Enter]:

1. Add [PostCSS] to your build tool.
2. Add [PostCSS Pseudo-Class Enter] as a PostCSS process.

```sh
npm install postcss-pseudo-class-enter --save-dev
```

### Node

```js
postcss([ require('postcss-pseudo-class-enter')({ /* options */ }) ])
```

### Grunt

Install [Grunt PostCSS]:

```shell
npm install postcss-pseudo-class-enter --save-dev
```

Enable it inside your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
	postcss: {
		options: {
			processors: [
				require('postcss-pseudo-class-enter')({ /* options */ })
			]
		},
		dist: {
			src: 'css/*.css'
		}
	}
});
```

See [PostCSS] docs for examples for your environment.

[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]: https://github.com/postcss/postcss
[PostCSS Pseudo-Class Enter]: https://github.com/jonathantneal/postcss-pseudo-class-enter
[ci-img]:  https://travis-ci.org/jonathantneal/postcss-pseudo-class-enter.svg
[ci]:      https://travis-ci.org/jonathantneal/postcss-pseudo-class-enter
