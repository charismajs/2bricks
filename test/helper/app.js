var config = require('../../server/config/config')['development'],
  constant = require('../../server/config/constant'),
  mongoose = require('../../server/config/mongoose')(config);

var chai = require('chai');
chai.should();
chai.use(require('chai-datetime'));

module.exports = {
  db : mongoose,
  const : constant
};


