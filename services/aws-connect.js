const ENV = require("../config/env");
const { AWSCONNECT, AWSCPC } = require("../config/config");
const { StartChatContactCommand } = require("@aws-sdk/client-connect");
const { CreateParticipantConnectionCommand } = require("@aws-sdk/client-connectparticipant");

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
    const startChatResponse = await AWSCONNECT.send(command);

    if(startChatResponse) {

        const createParticipantCommand = new CreateParticipantConnectionCommand({
            ParticipantToken: startChatResponse.ParticipantToken,
            Type: ["WEBSOCKET", "CONNECTION_CREDENTIALS"]
        });

        const createParticipantResponse = await AWSCPC.send(createParticipantCommand);

        console.log(createParticipantResponse)
    } else {
        console.log('empty');
    }
}

module.exports = {
    initializeChat
}