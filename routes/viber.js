const express = require('express');
const router = express.Router();
const db = require('../models');
const AWS = require("../services/aws-connect");
const Websocket = require("../services/websocket");
const ENV = require("../config/env");

router.post('/', async function (req, res, next) {
    let body = req.body;
    console.log("VIBERTeST::", body);
    res.status(200).send('EVENT_RECEIVED');
});

module.exports = router;