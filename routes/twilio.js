const express = require('express');
const router = express.Router();
const db = require('../models');
const AWS = require("../services/aws-connect");
const Websocket = require("../services/websocket");
const TwilioService = require("../services/twillio-client.js");

router.post('/', async function (req, res, next) {
    try {
        const { body: incomingData } = req;

        const customer = await db.User.findOne({ where: { customerNumber: incomingData.From } });
        const existingCustomerSocket = Websocket.activeClientList.find(s => s.customerNumber === incomingData.From);

        if (customer === null || !existingCustomerSocket || (customer !== null && new Date(customer.awsConnectionExpiry) < new Date())) {
            const connectionInfo = await AWS.initializeChat(incomingData);
            const userParam = {
                customerName: incomingData.ProfileName,
                customerInitialMessage: incomingData.Body,
                customerNumber: incomingData.From,
                customerIdentifier: incomingData.AccountSid,
                awsContactId: connectionInfo.awsContactId,
                awsParticipantId: connectionInfo.awsParticipantId,
                awsConnectionToken: connectionInfo.awsConnectionToken,
                awsConnectionExpiry: connectionInfo.awsConnectionExpiry,
                webSocketUrl: connectionInfo.awsWebsocketUrl,
                source: "twilio"
            };

            if (customer) {
                userParam.id = customer.id;
            }

            const user = await db.User.upsert(userParam);
            user && Websocket.initializeConnection(userParam);

        } else {
            const sentMessage = await AWS.sendMessageToChat({ connectionToken: customer.awsConnectionToken, incomingData: incomingData });
        }

    } catch (err) {
        console.log("Error::routes/twilio/", err);
    }

});

router.post("/status-callback", function (req, res) {
    res.sendStatus(204);
});

router.post("/sendtest", function (req, res) {
    TwilioService.sendMessage(req.body.message, req.body.num);
});


module.exports = router;