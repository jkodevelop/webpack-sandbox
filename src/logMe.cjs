const _ = require('lodash');

function logMe() {
  console.log(_.join(['Log', 'Me!?'], ' '));
  console.log('Is this built for production? ',PRODUCTION);
  console.log('NODE_ENV',process_env);
  console.log('VERSION',VERSION);
}

module.exports = {
  logMe,
}