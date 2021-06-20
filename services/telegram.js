const ENV = require("../config/env");
const axios = require("axios");

let setWebhooks = function(req, res, next) {
    axios.post(`${ENV.TELEGRAM_URL}${ENV.TELEGRAM_TOKEN}/setWebhook`, req.body)
        .then((response) => {
            res.status(200).send(response.data);
        }).catch((error) => {
            res.send(error);
        });

}

let sendMessage = function(content, customerNumber) {
    const chatId = customerNumber;
    const sentMessage = content;

    axios.post(`${ENV.TELEGRAM_URL}${ENV.TELEGRAM_TOKEN}/sendMessage`,
        {
            chat_id: chatId,
            text: sentMessage
        })
        .then((response) => {
            res.status(200).send(response.data);
        }).catch((error) => {
            res.send(error);
        });

}

module.exports = {
    sendMessage,
    setWebhooks
}