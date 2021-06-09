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
  const customerData = {
    From: ENV.CONNECT_SOURCE_NUMBER
  };
  // const chat = AWS.sendMessageToChat({
  //   connectionToken: data.ConnectionCredentials.ConnectionToken,
  //   incomingData: {
  //     Body: 'test1'
  //   }
  // });
  const existingSocket = Websocket.activeClientList.find(v => v.customerNumber === customerData.From)

  if(!existingSocket) {
    const connectInfo = await AWS.initializeChat();
    const socketData = {
      webSocketUrl: connectInfo.Websocket.Url,
      customerNumber: customerData.From
    }

    Websocket.initializeConnection(socketData);
  }

  res.json({ resp: '' });
});

module.exports = router;
