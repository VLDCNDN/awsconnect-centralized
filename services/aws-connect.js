const ENV = require("../config/env");
const { AWSCONNECT } = require("../config/config");
const { AssociateApprovedOriginCommand, AssociateApprovedOriginCommandInput } = require("@aws-sdk/client-connect");

let initializeChat = async incomingData => {
    const command = new AssociateApprovedOriginCommand({
        InstanceId: ENV.CONNECT_INSTANCE_ID,
        Origin: 'https://demo.palvision.com'
    });
    const response = await AWSCONNECT.send(command);

    console.log(response)
}

module.exports = {
    initializeChat
}