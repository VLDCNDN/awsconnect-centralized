const express = require('express');
const router = express.Router();

const { AWSTranslateClient } = require("../config/aws");
const { TranslateTextCommand } = require("@aws-sdk/client-translate");

router.post('/', async function (req, res, next) {
    let message = req.body.message;
    const command = new TranslateTextCommand({
        SourceLanguageCode:"auto",
        Text: message,
        TargetLanguageCode:"en",
    });

    const response = await AWSTranslateClient.send(command);

    res.status(200).send(response);
});

module.exports = router;