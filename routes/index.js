var express = require('express');
var router = express.Router();
const AWS = require("../services/aws-connect");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/test/aws', async function(req, res, next) {
  const data = await AWS.initializeChat();
  const chat = AWS.sendMessageToChat({
    connectionToken: data.ConnectionCredentials.ConnectionToken,
    incomingData: {
      Body: 'test1'
    }
  });


  res.json({ resp: '' });
});

module.exports = router;
