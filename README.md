# PostCSS Enter Pseudo Class [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS" width="90" height="90" align="right">][PostCSS]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

[PostCSS Enter Pseudo Class] lets you use the proposed [`:enter`] pseudo-class
in CSS.

`:enter` simplifies selectors targeting elements that are “designated”, as in
designated with a pointing device, rather than any device.


```pcss
nav :enter > span {
  background-color: yellow;
}

/* becomes */

nav :hover > span,
nav :focus > span {
  background-color: yellow;
}
```

From the [proposal]:

> The [`:enter`] pseudo-class applies while the user designates an element with
> a keyboard, pointing device, or other form of input. It matches an element if
> the element would match [`:focus`] or [`:hover`].

## Usage

Add [PostCSS Enter Pseudo Class] to your project:

```bash
npm install postcss postcss-pseudo-class-enter --save-dev
```

Use [PostCSS Enter Pseudo Class] to process your CSS:

```js
const postcssPseudoClassEnter = require('postcss-pseudo-class-enter');

postcssPseudoClassEnter.process(YOUR_CSS /*, processOptions, pluginOptions */);
```

Or use it as a [PostCSS] plugin:

```js
const postcss = require('postcss');
const postcssPseudoClassEnter = require('postcss-pseudo-class-enter');

postcss([
  postcssPseudoClassEnter(/* pluginOptions */)
]).process(YOUR_CSS /*, processOptions */);
```

[PostCSS Enter Pseudo Class] runs in all Node environments, with special
instructions for:

| [Node](INSTALL.md#node) | [PostCSS CLI](INSTALL.md#postcss-cli) | [Webpack](INSTALL.md#webpack) | [Create React App](INSTALL.md#create-react-app) | [Gulp](INSTALL.md#gulp) | [Grunt](INSTALL.md#grunt) |
| --- | --- | --- | --- | --- | --- |

## Options

### prefix

The `prefix` option determines whether the `:enter` pseudo-class should use a
prefix, and what that prefix will be.

```js
postcssPseudoClassEnter({ prefix: 'x' }); // transforms :-x-enter
```

#### outline

Type: `String`  
Default: unset

The `outline` option determines whether an outline declaration will be added to
rules using the `:enter` pseudo-class. If a string is passed, its value will be
used for the outline declaration.

```js
postcssPseudoClassEnter({ outline: true }); // adds outline: 0;
```

```js
postcssPseudoClassEnter({ outline: 'none' }); // adds outline: none;
```

## Alternatives

Below are some other methods to recreate the effects of `:enter`.

#### Use :focus and :hover (supported everywhere)

```css
:focus, :hover { /* ... */ }
```

#### Use :matches (supported in Firefox 4+, Chrome 12+, Opera 15+, Safari 5.1+)

```css
:matches(:focus, :hover) { /* ... */ }
```

#### Use @custom-selector (supported nowhere yet)

```css
@custom-selector :--enter :focus, :hover;

:--enter { /* ... */ }
```

#### Use [Sass] mixins (requires preprocessing)

```scss
@mixin -enter { &:focus, &:hover { @content; } }

@include -enter { /* ... */ }
```

[cli-img]: https://img.shields.io/travis/jonathantneal/postcss-pseudo-class-enter.svg
[cli-url]: https://travis-ci.org/jonathantneal/postcss-pseudo-class-enter
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[npm-img]: https://img.shields.io/npm/v/postcss-pseudo-class-enter.svg
[npm-url]: https://www.npmjs.com/package/postcss-pseudo-class-enter

[`:enter`]: https://discourse.specifiction.org/t/a-common-pseudo-class-for-hover-and-focus/877
[`:focus`]: https://dev.w3.org/csswg/selectors/#focus-pseudo
[`:hover`]: https://dev.w3.org/csswg/selectors/#visited-pseudo
[PostCSS]: https://github.com/postcss/postcss
[PostCSS Enter Pseudo Class]: https://github.com/jonathantneal/postcss-pseudo-class-enter
[proposal]: https://discourse.specifiction.org/t/a-common-pseudo-class-for-hover-and-focus/877
[Sass]: https://sass-lang.com/
