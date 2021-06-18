var express = require('express');
var router = express.Router();
const AWS = require("../services/aws-connect");
const Websocket = require("../services/websocket");
const ENV = require("../config/env");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/aws', async function (req, res, next) {
  
  return;
  const customerData = {
    From: ENV.CONNECT_SOURCE_NUMBER
  };

  const existingSocket = Websocket.activeClientList.find(v => v.customerNumber === customerData.From)

  if(!existingSocket) {
    const connectInfo = await AWS.initializeChat();

    const socketData = {
      webSocketUrl: connectInfo.Websocket.Url,
      customerNumber: customerData.From,
      connectionToken: connectInfo.ConnectionCredentials.ConnectionToken
    }
    
    Websocket.initializeConnection(socketData);
  }

});

module.exports = router;
