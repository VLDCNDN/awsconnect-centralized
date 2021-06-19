const express = require('express');
const router = express.Router();
const db = require('../models');
const AWS = require("../services/aws-connect");
const Websocket = require("../services/websocket");

router.post('/', async function (req, res, next) {
    try {
        const { body: incomingData } = req;


        const customer = await db.User.findOne({ where: { customerNumber: incomingData.WaId } });

        if (customer === null || new Date(customer.awsConnectionExpiry) < new Date()) {
            const connectionInfo = await AWS.initializeChat(incomingData);
            const userParam = {
                customerName: incomingData.ProfileName,
                customerInitialMessage: incomingData.Body,
                customerNumber: incomingData.WaId,
                customerIdentifier: incomingData.AccountSid,
                awsContactId: connectionInfo.awsContactId,
                awsParticipantId: connectionInfo.awsParticipantId,
                awsConnectionToken: connectionInfo.awsConnectionToken,
                awsConnectionExpiry: connectionInfo.awsConnectionExpiry
            };

            const user = await db.User.create(userParam);
            const socketData = {
                webSocketUrl: connectionInfo.awsWebsocketUrl,
                customerNumber: incomingData.WaId,
                customerName: incomingData.ProfileName
            };

            user && WebSocket.initializeConnection(socketData);

        } else {
            console.log("SUCESS::customer", customer);
        }

    } catch (err) {
        console.log("Error::routes/twilio/", err);
    }

});

router.post("/status-callback", function (req, res) {
    res.sendStatus(204);
});


module.exports = router;