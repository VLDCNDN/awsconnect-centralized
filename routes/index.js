var express = require('express');
var router = express.Router();
const AWS = require("../services/aws-connect");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/test/credential/aws', function(req, res, next) {
  const data = AWS.initializeChat();

  res.json({ title: 'Express' });
});

module.exports = router;
