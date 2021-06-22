const express = require('express');
const router = express.Router();
const db = require('../models');
const AWS = require("../services/aws-connect");
const Websocket = require("../services/websocket");
const ENV = require("../config/env");

router.post('/', async function (req, res, next) {
    let body = req.body;
    console.log("BODY", body);
    if (body.event === "message") {
        const customer = await db.User.findOne({ where: { customerNumber: body.sender.id } });

        if (customer === null || (customer !== null && new Date(customer.awsConnectionExpiry) < new Date())) {
            const connectionInfo = await AWS.initializeChat({ ProfileName: body.sender.name });
            const userParam = {
                customerName: body.sender.name,
                customerInitialMessage: body.message.text,
                customerNumber: body.sender.id,
                customerIdentifier: body.sender.id,
                awsContactId: connectionInfo.awsContactId,
                awsParticipantId: connectionInfo.awsParticipantId,
                awsConnectionToken: connectionInfo.awsConnectionToken,
                awsConnectionExpiry: connectionInfo.awsConnectionExpiry,
                webSocketUrl: connectionInfo.awsWebsocketUrl,
                source: "viber"
            };

            if (customer) {
                userParam.id = customer.id;
            }

            const user = await db.User.upsert(userParam);
            // Websocket.initializeConnection(userParam);

        } else {
            // const sentMessage = await AWS.sendMessageToChat({ connectionToken: customer.awsConnectionToken, incomingData: { Body : body.message.text} });
            // send message here
            console.log("/viber/ :: EXISTING USER", sentMessage);
        }
    }


    res.status(200).send('EVENT_RECEIVED');
});

module.exports = router;