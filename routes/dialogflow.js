const express = require('express');
const router = express.Router();
const df = require("../services/dialogflow");
const ENV = require("../config/env");

router.post('/webhook', async function (req, res, next) {
    let context = await df.executeQueries(ENV.DF_PROJECT_ID, "123456789A",req.body.message, "en");
    console.log(context);
    
    res.status(200).send(context);
});


module.exports = router;