# PostCSS Pseudo-Class Enter [![Build Status][ci-img]][ci]

<img align="right" width="135" height="95" src="http://postcss.github.io/postcss/logo-leftp.png" title="Philosopher’s stone, logo of PostCSS">

[PostCSS Pseudo-Class Enter] is a [PostCSS] plugin that allows you to use the proposed [`:enter`] pseudo-class in CSS.

`:enter`  simplifies selectors targeting elements that are designated, as the naming of `:hover` is somewhat misleading; it specifically means elements designated with a pointing device, rather than any device.

```css
/* before */

nav :enter > span {
	background-color: yellow;
}

/* after */

nav :hover > span,
nav :focus > span {
	background-color: yellow;
}
```


From the [proposal]:

> The [`:enter`] pseudo-class applies while the user designates an element with a keyboard, pointing device, or other form of input. It matches an element if the element would match [`:focus`] or [`:hover`].

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

Enable [PostCSS Pseudo-Class Enter] within your Gruntfile:

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

### Options

**prefix** (string): prepends a prefix (surrounded by dashes) to the pseudo-class, preventing any clash with native syntax.

```js
{
	prefix: 'foo' // pseudo-class becomes :-foo-enter
}
```

### Alternatives

Below are some other methods to recreate the effects of `:enter`.

#### Use @custom-selector (supported nowhere yet)

```css
@custom-selector :--enter :focus, :hover;

:--enter { /* ... */ }
```

#### Use :matches (supported in Firefox 4+, Chrome 12+, Opera 15+, Safari 5.1+)

```css
:matches(:focus, :hover) { /* ... */ }
```

#### Use :focus and :hover (supported everywhere)

```css
:focus, :hover { /* ... */ }
```

#### Use [Sass] mixins (requires preprocessing)

```scss
@mixin -enter { &:focus, &:hover { @content; } }

@include -enter { /* ... */ }
```

[`:enter`]: http://discourse.specifiction.org/t/a-common-pseudo-class-for-hover-and-focus/877
[`:focus`]: http://dev.w3.org/csswg/selectors/#focus-pseudo
[`:hover`]: http://dev.w3.org/csswg/selectors/#visited-pseudo
[ci]: https://travis-ci.org/jonathantneal/postcss-pseudo-class-any-link
[ci-img]: https://travis-ci.org/jonathantneal/postcss-pseudo-class-any-link.svg
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]: https://github.com/postcss/postcss
[PostCSS Pseudo-Class Enter]: https://github.com/jonathantneal/postcss-pseudo-class-enter
[proposal]: http://discourse.specifiction.org/t/a-common-pseudo-class-for-hover-and-focus/877
[Sass]: http://sass-lang.com/
