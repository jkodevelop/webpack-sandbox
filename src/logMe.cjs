const _ = require('lodash');

function logMe() {
  console.log(_.join(['Log', 'Me!?'], ' '));
  console.log('Is this built for production? ',PRODUCTION);
  console.log('NODE_ENV',process_env);
  console.log('VERSION',VERSION);
  console.log('node_cli_env',node_cli_env);
}

module.exports = {
  logMe,
}