const ENV = require("../config/env");
const axios = require("axios");

const fbURL = "https://graph.facebook.com/v11.0";

let sendMessage = async function({recipientId, message}){

    const resp = await axios.post(`${fbURL}/me/messages?access_token=${ENV.FB_ACCESS_TOKEN}`,
    {
        messaging_type: "UPDATE",
        recipient: {
          id: recipientId
        },
        message: {
          text: message
        }
      });

    return resp;

}

let getUserInfo = async function(userId) {

    const resp = await axios.get(`${fbURL}/${userId}?access_token=${ENV.FB_ACCESS_TOKEN}`);

    return resp;
}

module.exports = {
    sendMessage,
    getUserInfo
}