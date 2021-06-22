var express = require('express');
var router = express.Router();
const ENV = require("../config/env");

router.use('/twilio', require('./twilio'));
router.use('/telegram', require('./telegram'));
router.use('/facebook', require('./fbmessenger'));
router.use('/viber', require('./viber'));

module.exports = router;
