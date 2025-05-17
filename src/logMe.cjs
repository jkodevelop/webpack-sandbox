const _ = require('lodash');

function logMe() {
  console.log(_.join(['Log', 'Me!'], ' '));
}

module.exports = {
  logMe,
}