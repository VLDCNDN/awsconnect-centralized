var express = require('express');
var router = express.Router();
const ENV = require("../config/env");

router.use('/twilio', require('./twilio'));
router.use('/telegram', require('./telegram'));

module.exports = router;
