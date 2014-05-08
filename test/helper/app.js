var config = require('../../server/config/config')['development'];
require('../../server/config/mongoose')(config);
var chai = require('chai');
chai.should();
chai.use(require('chai-datetime'));


