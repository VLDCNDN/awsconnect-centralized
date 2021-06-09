const ENV = require("../config/env");
const { AWSCONNECT } = require("../config/config");
const { StartChatContactCommand } = require("@aws-sdk/client-connect");

let initializeChat = async incomingData => {
    const command = new StartChatContactCommand({
        InstanceId: ENV.CONNECT_INSTANCE_ID,
        ContactFlowId: ENV.CONNECT_CONTACT_FLOW_ID,
        ParticipantDetails: {
            DisplayName: 'test local'
        },
        Attributes: {
            Channel: "CHAT"
        }
    });
    const response = await AWSCONNECT.send(command);

    console.log(response)
}

module.exports = {
    initializeChat
}