const express = require('express');
const router = express.Router();
const db = require('../models');
const AWS = require("../services/aws-connect");
const Websocket = require("../services/websocket");
const ENV = require("../config/env");
const FB = require("../services/facebook");


router.post('/', async function (req, res, next) {

    let body = req.body;

    // Checks this is an event from a page subscription
    if (body.object === 'page') {
        let incomingData = [];
        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach(function (entry) {

            // Gets the message. entry.messaging is an array, but 
            // will only ever contain one message, so we get index 0
            let webhook_event = entry.messaging[0];

            if (typeof webhook_event.message !== "undefined") {
                incomingData = webhook_event;
                
                FB.getUserInfo(webhook_event.sender.id).then((response) => {
                    incomingData['profile'] = response.data;
                }).catch((error) => {
                    console.log("ERROR::FB.getUserInfo",error);
                });
            }
        });
        console.log("incomingData", incomingData);

        // Returns a '200 OK' response to all requests
        res.status(200).send('EVENT_RECEIVED');
    } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }
});

// this will be used to verify webhook
router.get('/', function (req, res, next) {

    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if (mode && token) {
        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === ENV.FB_VERIFY_TOKEN) {

            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);

        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
});

router.post('/testsend', function (req, res, next) {
    FB.sendMessage({
        recipientId: "4423920954298907", message: "test messaage"
    })
        .then((response) => {
            res.status(200).send(response.data);
        }).catch((error) => {
            res.send(error);
        });

});

module.exports = router;