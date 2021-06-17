const ENV = require("../config/env");
const { TwilioClient } = require("../config/config");

let sendMessage = (content, customerNumber) => {
  TwilioClient.messages
    .create({
      from: ENV.TWILIO_WHATSAPP_NUM,
      body: content,
      to: ENV.CONNECT_SOURCE_NUMBER
    })
    .then(message => console.log("Success::sendMessage", message.sid));
};

module.exports = { sendMessage };
