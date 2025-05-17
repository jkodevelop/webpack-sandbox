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
note: `index.html` is required because webpack doesn't generate the html file for the project. It only compiles *.js files into \dist\main.js by default. And the script reference to `main.js` is added.
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

Instead of using the basic default values for webpack, use the `web.config.js` to control webpack parameters.

*look at webpack.config.js file for reference*

`mode` - can specify *development* or *production*
`entry` - starting point
`resolve` - watch for these files/type of files
`output` - output file


#### source

https://webpack.js.org/guides/
https://dev.to/ikusteu/the-common-man-guide-to-webpack-webpack-for-beginners-1i5o
