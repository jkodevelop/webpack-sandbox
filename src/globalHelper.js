function commonLog() {
  console.log('global function example, injected through webpack.DefinePlugin()');
}

module.exports = {
  commonLog,
}