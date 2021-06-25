const ENV = require("../config/env");
const axios = require("axios");

let sendMessage = function (content, customerNumber, awsAgentName) {
    let config = {
        headers: {
            "X-Viber-Auth-Token": ENV.VIBER_TOKEN,
        }
    };
    
    axios.post(`https://chatapi.viber.com/pa/send_message`,
        {
            receiver: customerNumber,
            min_api_version: 1,
            sender: {
                name: awsAgentName,
                avatar: "https://www.palvision.com/wp-content/uploads/2020/11/palvision-logo-R.png"
            },
            tracking_data: "tracking data",
            type: "text",
            text: content
        }, config)
        .then((response) => {
            console.log("/services/viber/sendMessage", response.data);
        }).catch((error) => {
            console.log("/services/viber/sendMessage/error", error);
        });

}

module.exports = {
    sendMessage
}