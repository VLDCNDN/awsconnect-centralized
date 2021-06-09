const ENV = require("../config/env");
const { AWSCONNECT, AWSCPC } = require("../config/config");
const { StartChatContactCommand } = require("@aws-sdk/client-connect");
const { CreateParticipantConnectionCommand, SendMessageCommand } = require("@aws-sdk/client-connectparticipant");

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
        return createParticipantResponse;
    }
}

let sendMessageToChat = async ({connectionToken, incomingData}) => {
    const sendMessageCommand = new SendMessageCommand({
        ConnectionToken: connectionToken,
        Content: incomingData.Body,
        ContentType: "text/plain"
    });

    const response = await AWSCPC.send(sendMessageCommand);

    console.log(response);
}

module.exports = {
    initializeChat,
    sendMessageToChat
}