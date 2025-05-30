const _ = require('lodash');

function logMe() {
  console.log(_.join(['Log', 'Me!?'], ' '));
  
  // from webpack config: DefinePlugin()
  console.log('VERSION',VERSION);

  // from webpack config: Dotenv()
  console.log('dotenv file:', process.env.DB_HOST, process.env.ENV_MODE);
}

module.exports = {
  logMe,
}