# PostCSS Pseudo Class Enter [![Build Status][ci-img]][ci]

<img align="right" width="135" height="95" src="http://postcss.github.io/postcss/logo-leftp.png" title="Philosopher’s stone, logo of PostCSS">

[Pseudo Class Enter] is a [PostCSS] plugin that transforms the proposed `:enter` pseudo-class into `:focus` and `:hover`.

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

```js
postcss([ require('postcss-pseudo-class-enter') ])
```

See [PostCSS] docs for examples for your environment.

[Pseudo Class Enter]: https://github.com/jonathantneal/postcss-short
[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/jonathantneal/postcss-pseudo-class-enter.svg
[ci]:      https://travis-ci.org/jonathantneal/postcss-pseudo-class-enter
