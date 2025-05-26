# WEBPACK quick guide [2025]

This project is a quick step by step guide on Webpack 5. Following several tutorials and resources to create a guide.
The Readme will have the steps per installation/setup to including new configurations for processing different file types to builds and distributions.


## 1. install webpack packages

Install the necessary packages.
```
$ npm install --save-dev webpack webpack-cli
```


## 2. setup the basic structure

```
\dist\index.html
\src\index.js
```


## 3. using webpack build

This step uses the webpack build system without webpack.config.js therefore default values are used in the build process/command.
Also in this step's example, **lodash** is added to show the bundling affect of webpack.

Install **lodash** node library
```
$ npm install --save lodash
```

note: After webpack version 4 the webpack.config.js is not needed anymore because it uses default values, but only with the most basic use case.
note: `index.html` is required because webpack doesn't generate the html file for the project. It only compiles .js files into \dist\main.js by default. And the script reference to `main.js` is added.
note: Webpack auto generates license files from node libraries that are needed in tthe `\dist` folder

The default values for the most basic use case are:

input source: 
`entry: \src\index.js`

output source:
`output: \dist\main.js`

To build and create `\dist\main.js`
```
$ npx webpack
```


## 4. use config file

Instead of using the basic default values for webpack, use the `webpack.config.js` to control webpack parameters.

*look at webpack.config.js file for reference*

`mode` - can specify *development* or *production*
`entry` - starting point
`resolve` - watch for these files/type of files
`output` - output file


## 5. loading & bundling CSS

Adding module.rules with `style-loader` and `css-loader` (order is important) to process and inject css into the webpack bundle.

1. first install the loaders
```
npm install --save-dev style-loader css-loader
```

2. add a new module/rules in `webpack.config.js`

3. add the `style.css` in `.\src` folder AND import it through the index.js file

The `css-loader` processes the import from javascript and `style-loader` injects the css into the html through javascript. The index.html source file will not have any style, it gets injected through main.js.


## 5b. adding SASS

Adding Sass support, with this loader the power of Sass can be added into the bundler

1. first install the loaders and sass
```
npm install --save-dev sass sass-loader
```

2. edit the *rules.test*, this will look for .css | .scss | .sass 
```
test: /\.(sc|sa|c)ss$/i
``` 

3. add the sass-loader into the *rules.use*, note the order matters. sass-loader is added at the end to be the first loader to run in the list. This is based on webpack processing order rule.

source: https://webpack.js.org/loaders/sass-loader/


## 6. Static Content loading, aka Asset Management

Webpack has a built in assets loader, this allows for images and fonts to be included without any external loader to be installed. 
This allows webpack to load in static content either through javascript import or even css url() directives.

1. to use this edit the rules in the config to include a new array of content.
the example type support replaces the file-loader
```
type: 'asset/resource'
```

source: https://webpack.js.org/guides/asset-modules/

## 7. Additional loaders examples

There are more loaders like `csv-loader` & `xml-loader`

1. install the loaders
```
npm install --save-dev csv-loader xml-loader
```

2. edit the rules and add the loaders into the webpack.config.js


## 8. Using Custom Parsers

Instead of loaders, custom parsers can be used to process specific file types such as yaml files

**IMPORTANT note:** These parser libraries are not specifically made for webpack but webpack can use their parse function to pass the files type based on the rules set in webpack.config.js

1. install the parser
```
npm install --save-dev yamljs
```

2. add the parser rule set in webpack.config.js

source: https://github.com/jeremyfa/yaml.js


## 9. Output Management, multiple entry and multiple output bundles

Webpack can handle multiple entries and output bundles based on the entries.
*note:* the output is based on the entry part of the webpack.config.js, the bundles do not need to be embedded or imported for webpack to build the bundles from them. Example: print.js and index.js can be completely disconnected and index.html does not have reference to print.js BUT webpack will still create the print.bundle.js, even though it has no functionality.

1. edit the `entry` field and `output` field
```
entry: { 
  index: './src/index.js',
  print: './src/print.js'
},
...  
output: {
  filename: '[name].bundle.js',
  path: path.resolve(__dirname, 'dist'),
},
```


## 10. HtmlWebpackPlugin, generate the index.html automatically

Webpack has a feature called plugin to add more functionality. 
**HtmlWebpackPlugin** allows webpack to auto generate index.html
*note:* delete the `dist/index.html` and let webpack create and replace it.

1. install the plugin
```
npm install --save-dev html-webpack-plugin
```

2. add plugin into webpack.config.js
```
plugins: [
  new HtmlWebpackPlugin({
    title: 'Get Started Webpack',
  }),
],
```


## 10b. clean /dist folder

With webpack auto generate the index.html, the `dist` folder can be cleaned everytime webpack builds.

1. add clean in output
```
output: {
	...
	clean: true
}
```


## 11. MiniCssExtractPlugin, extract StyleSheet instead of injecting css

**MiniCssExtractPlugin** is a plugin that allows for CSS to be extracted and included into the site by a `.css` file. 
This replaces `style-loader`: this injects css rules into the site. MiniCssExtractPlugin will generate and put the css file into the `dist` folder on build.

1. install the plugin
```
npm install --save-dev mini-css-extract-plugin
```

2. add plugin into webpack.config.js
```
plugins: [
  new MiniCssExtractPlugin(),
],
...
module: {
	rules: [{
		test: /\.(sc|sa|c)ss$/i,
    use: [MiniCssExtractPlugin.loader,'css-loader','sass-loader']
	}]
}
```

Useful options in new MiniCssExtractPlugin():
```
new MiniCssExtractPlugin({
  // Options similar to the same options in webpackOptions.output
  // both options are optional
  filename: "[name].css",
  chunkFilename: "[id].css",
}),
```

source: https://webpack.js.org/plugins/mini-css-extract-plugin/


## 12. CssMinimizerWebpackPlugin, enables css minification

**CssMinimizerWebpackPlugin** this allows webpack to minify css output on build

1. install the plugin
```
npm install --save-dev css-minimizer-webpack-plugin
```

2. add plugin and edit webpack.config.js
```
optimization: {
  minimizer: [
    new CssMinimizerPlugin(),
  ],
},
```

Useful options in `minimizer` and options
```
new CssMinimizerPlugin({ parallel:true }),
...
minimize: true // this enables minify in mode:development
```

source: https://webpack.js.org/plugins/css-minimizer-webpack-plugin/


## 13. CopyWebpackPlugin, copy files to output directly

**CopyWebpackPlugin** this enables copy of folder/file

1. Install the plugin
```
npm install --save-dev copy-webpack-plugin
```

2. add the plugin
```
new CopyPlugin({
  patterns: [
    { from: "src/secretstatic", to: "secret" },
  ],
}),
```

source: https://webpack.js.org/plugins/copy-webpack-plugin/


## 14. webpack PRODUCTION and DEVELOPMENT build mode and organization

Webpack has default behavior that is built-in when building in production mode vs development mode. 
Such as minifications, this is auto enabled when in production mode. 
The help manage configuration between production and development webpack merge can help load common config with production and develop modes.

1. install the merge module
```
npm install --save-dev webpack-merge
```

2. split the `webpack.config.js` into .common, .prod, .dev
```
webpack.common.js
webpack.dev.js
webpack.prod.js
```

3. update package.json npm scripts
```
"start": "npx webpack --config webpack.config.js",
"build:dev": "webpack --config webpack.dev.js",
"build": "webpack --config webpack.prod.js"
```

source: https://webpack.js.org/guides/production/


## 15. watch option

Webpack supports `watch` flag. Once enabled when files are changed webpack will rebuild automatically.

1. add --watch option to package.json
```
"watch": "webpack --watch"
```


## 16. webpack-dev-server

Use **webpack-dev-server** to server the built project from a node server.

1. install the module
```
npm install --save-dev webpack-dev-server
```

2. edit the webpack.config files
```
devServer: {
  static: './dist',
},
```

Additional edits
a. More control with dev-server config, enable gzip and change the default port from 8080
```
devServer: {
  ...
  compress: true, // enable: gzip
  port: 9000,
},
```
b. This helps solve duplicate module issue, since this example has multiple entries in the entry: { index, print }. source: https://bundlers.tooling.report/code-splitting/multi-entry/
```
optimization: {
  runtimeChunk: 'single',
},
```

3. edit package.json with new script
```
"serve": "webpack serve --open --config webpack.dev.js"
```

source: https://webpack.js.org/guides/development/


# 17. HMR dependsOn: webpack-dev-server

HMR stands for Hot Module Replacement, this feature is used with devServer.
This option can speed up development, because when changing the code devServer will try to inject the changes instead of refreshing the whole page (refreshing will reset the local states). 

**IMPORT note:** webpack-dev-server v4+ has HMR enabled by default. devServer will try to hot reload until it cannot, which it will just reload the whole page. 

1. to enable HMR in web-dev-server, edit webpack.dev.js
```
devServer: {
  ...
  hot: true,
},
```

2. to Utilize HMR feature for JS modules, edit index.js using the HMR functions
```
if (module.hot) {
  module.hot.accept('./logMe.cjs', function() {
    console.log('accepting updated logMe module.');
    logMe();
  });
}
```
*note*: when running web-dev-server, editing print.js will reload the page, but now updating logMe.cjs changes get injected with HMR so the page doesn't reload

3. CSS update
In order for HMR to work with CSS update with the current changed in webpack.config/dev.js so far. 
The `MiniCssExtractPlugin` extract to file plugin needs to be removed when running web-dev-server.
Replace `MiniCssExtractPlugin` with `style-loader` instead, to allow for HMR with CSS changes with devServer.

Problem when running devServer x `MiniCssExtractPlugin` x HMR:
`Refused to apply style from 'http://localhost:9000/index.3c257f127a5eff0eb344.css?1748203109816' because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled.`

Using the `style-loader` fixes this problem.

source: https://webpack.js.org/concepts/hot-module-replacement/

**FINAL THOUGHT:** using module.hot.accept() could add a lot of code. So use it sparingly.


## 18. Environment Variables using DefinePlugin()

There is option for Webpack to load global resources into the project. Using `DefinePlugin()` to load resources globally without having to import() it

1. use `DefinePlugin()`
```
plugins: [
  new webpack.DefinePlugin({
    PRODUCTION: JSON.stringify(true),
    VERSION: JSON.stringify('5fa3b9'),
    BROWSER_SUPPORTS_HTML5: true,
    TWO: '1+1',
    'typeof window': JSON.stringify('object'),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  })
]
```

*note:* This can even add function and libraries to the global space as well.

source: https://webpack.js.org/plugins/define-plugin/



#### source

https://webpack.js.org/guides/
https://dev.to/ikusteu/the-common-man-guide-to-webpack-webpack-for-beginners-1i5o
