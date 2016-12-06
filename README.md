# :enter <a href="https://github.com/postcss/postcss"><img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS Logo" width="90" height="90" align="right"></a>

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Licensing][lic-image]][lic-url]
[![Changelog][log-image]][log-url]
[![Gitter Chat][git-image]][git-url]

[:enter] lets you use the proposed [`:enter`] pseudo-class in CSS.

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

## Options

#### `prefix`

Type: `String`  
Default: `-`

Adds the prefix surrounded by dashes before the pseudo-class.

#### `outline`

Type: `String`  
Default: unset

Adds an outline declaration to matching rules when an existing one does not already exist.

## Usage

Follow these steps to use [:enter].

Add [:enter] to your build tool:

```bash
npm install postcss-pseudo-class-enter --save-dev
```

#### Node

```js
require('postcss-pseudo-class-enter')({ /* options */ }).process(YOUR_CSS);
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Load [:enter] as a PostCSS plugin:

```js
postcss([
    require('postcss-pseudo-class-enter')({ /* options */ })
]);
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Enable [:enter] within your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
    return gulp.src('./css/src/*.css').pipe(
        postcss([
            require('postcss-pseudo-class-enter')({ /* options */ })
        ])
    ).pipe(
        gulp.dest('./css')
    );
});
```

#### Grunt

Add [Grunt PostCSS] to your build tool:

```bash
npm install grunt-postcss --save-dev
```

Enable [:enter] within your Gruntfile:

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

## Alternatives

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

[npm-url]: https://www.npmjs.com/package/postcss-pseudo-class-enter
[npm-img]: https://img.shields.io/npm/v/postcss-pseudo-class-enter.svg
[cli-url]: https://travis-ci.org/jonathantneal/postcss-pseudo-class-enter
[cli-img]: https://img.shields.io/travis/jonathantneal/postcss-pseudo-class-enter.svg
[lic-url]: LICENSE.md
[lic-image]: https://img.shields.io/npm/l/postcss-pseudo-class-enter.svg
[log-url]: CHANGELOG.md
[log-image]: https://img.shields.io/badge/changelog-md-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[git-image]: https://img.shields.io/badge/chat-gitter-blue.svg

[:enter]: https://github.com/jonathantneal/postcss-pseudo-class-enter
[`:enter`]: http://discourse.specifiction.org/t/a-common-pseudo-class-for-hover-and-focus/877
[`:focus`]: http://dev.w3.org/csswg/selectors/#focus-pseudo
[`:hover`]: http://dev.w3.org/csswg/selectors/#visited-pseudo
[proposal]: http://discourse.specifiction.org/t/a-common-pseudo-class-for-hover-and-focus/877
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]: https://github.com/postcss/postcss
[Sass]: http://sass-lang.com/
