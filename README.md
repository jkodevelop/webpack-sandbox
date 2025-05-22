# WEBPACK quick guide [2025]

This project is a quick step by step guide on Webpack 5. Following several tutorials and resources to create a guide.
The Readme will have the steps per installation/setup to including new configurations for processing different file types to builds and distributions.


## 1. install webpack packages

Install the necessary packages.
```
$ npm install webpack webpack-cli --save-dev
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


#### source

https://webpack.js.org/guides/
https://dev.to/ikusteu/the-common-man-guide-to-webpack-webpack-for-beginners-1i5o
