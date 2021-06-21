const express = require('express');
const router = express.Router();
const db = require('../models');
const AWS = require("../services/aws-connect");
const Websocket = require("../services/websocket");
const Telegram = require("../services/telegram");

/**
 * Before running this make sure to run /setWebhooks
 * NOTE: always return status to prevent telegram to send the same update
 */
router.post('/', async function (req, res, next) {
    try {

        const { body: incomingData } = req;
        const customer = await db.User.findOne({ where: { customerNumber: incomingData.message.chat.id } });
        const existingCustomerSocket = Websocket.activeClientList.find(s => s.customerNumber === incomingData.message.chat.id);

        if (customer === null || !existingCustomerSocket ||  (customer !== null && new Date(customer.awsConnectionExpiry) < new Date())) {
            const connectionInfo = await AWS.initializeChat({ ProfileName : incomingData.message.chat.first_name});
            const userParam = {
                customerName: incomingData.message.chat.first_name,
                customerInitialMessage: incomingData.message.text,
                customerNumber: incomingData.message.chat.id,
                customerIdentifier: incomingData.message.chat.id,
                awsContactId: connectionInfo.awsContactId,
                awsParticipantId: connectionInfo.awsParticipantId,
                awsConnectionToken: connectionInfo.awsConnectionToken,
                awsConnectionExpiry: connectionInfo.awsConnectionExpiry,
                webSocketUrl: connectionInfo.awsWebsocketUrl,
                source: "telegram"
            };

            if (customer) {
                userParam.id = customer.id;
            }

            const user = await db.User.upsert(userParam);
            console.log("test" , "::", incomingData);
            // Websocket.initializeConnection(userParam);
         
        } else {
            // const sentMessage = await AWS.sendMessageToChat({ connectionToken: customer.awsConnectionToken, incomingData: { Body : incomingData.message.text} });
            console.log("existing");
        }

        res.sendStatus(200);
    } catch (err) {
        console.log("Error::routes/telegram/", err);
        res.sendStatus(200);
    }
});

router.post('/setWebhooks', Telegram.setWebhooks);

router.post('/samplesend', async function (req, res, next) {
    const resp = await Telegram.sendMessage("tset", 1847652854);

    res.send(resp);
});

module.exports = router;