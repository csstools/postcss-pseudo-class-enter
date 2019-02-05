# Installing PostCSS Enter Pseudo Class

[PostCSS Enter Pseudo Class] runs in all Node environments, with special instructions for:

| [Node](#node) | [PostCSS CLI](#postcss-cli) | [Webpack](#webpack) | [Create React App](#create-react-app) | [Gulp](#gulp) | [Grunt](#grunt) |
| --- | --- | --- | --- | --- | --- |

## Node

Add [PostCSS Enter Pseudo Class] to your project:

```bash
npm install postcss-pseudo-class-enter --save-dev
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

## PostCSS CLI

Add [PostCSS CLI] to your project:

```bash
npm install postcss-cli --save-dev
```

Use [PostCSS Enter Pseudo Class] in your `postcss.config.js` configuration file:

```js
const postcssPseudoClassEnter = require('postcss-pseudo-class-enter');

module.exports = {
  plugins: [
    postcssPseudoClassEnter(/* pluginOptions */)
  ]
}
```

## Webpack

Add [PostCSS Loader] to your project:

```bash
npm install postcss-loader --save-dev
```

Use [PostCSS Enter Pseudo Class] in your Webpack configuration:

```js
const postcssPseudoClassEnter = require('postcss-pseudo-class-enter');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader', options: {
            ident: 'postcss',
            plugins: () => [
              postcssPseudoClassEnter(/* pluginOptions */)
            ]
          } }
        ]
      }
    ]
  }
}
```

## Create React App

Add [React App Rewired] and [React App Rewire PostCSS] to your project:

```bash
npm install react-app-rewired react-app-rewire-postcss --save-dev
```

Use [React App Rewire PostCSS] and [PostCSS Enter Pseudo Class] in your
`config-overrides.js` file:

```js
const reactAppRewirePostcss = require('react-app-rewire-postcss');
const postcssPseudoClassEnter = require('postcss-pseudo-class-enter');

module.exports = config => reactAppRewirePostcss(config, {
  plugins: () => [
    postcssPseudoClassEnter(/* pluginOptions */)
  ]
});
```

## Gulp

Add [Gulp PostCSS] to your project:

```bash
npm install gulp-postcss --save-dev
```

Use [PostCSS Enter Pseudo Class] in your Gulpfile:

```js
const postcss = require('gulp-postcss');
const postcssPseudoClassEnter = require('postcss-pseudo-class-enter');

gulp.task('css', () => gulp.src('./src/*.css').pipe(
  postcss([
    postcssPseudoClassEnter(/* pluginOptions */)
  ])
).pipe(
  gulp.dest('.')
));
```

## Grunt

Add [Grunt PostCSS] to your project:

```bash
npm install grunt-postcss --save-dev
```

Use [PostCSS Enter Pseudo Class] in your Gruntfile:

```js
const postcssPseudoClassEnter = require('postcss-pseudo-class-enter');

grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
  postcss: {
    options: {
      use: [
       postcssPseudoClassEnter(/* pluginOptions */)
      ]
    },
    dist: {
      src: '*.css'
    }
  }
});
```

[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]: https://github.com/postcss/postcss
[PostCSS CLI]: https://github.com/postcss/postcss-cli
[PostCSS Loader]: https://github.com/postcss/postcss-loader
[PostCSS Enter Pseudo Class]: https://github.com/jonathantneal/postcss-pseudo-class-enter
[React App Rewire PostCSS]: https://github.com/csstools/react-app-rewire-postcss
[React App Rewired]: https://github.com/timarney/react-app-rewired
