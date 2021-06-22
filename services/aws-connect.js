const ENV = require("../config/env");
const { AWSCONNECT, AWSCPC } = require("../config/aws");
const { StartChatContactCommand } = require("@aws-sdk/client-connect");
const { CreateParticipantConnectionCommand, SendMessageCommand } = require("@aws-sdk/client-connectparticipant");

let initializeChat = async incomingData => {
    const command = new StartChatContactCommand({
        InstanceId: ENV.CONNECT_INSTANCE_ID,
        ContactFlowId: ENV.CONNECT_CONTACT_FLOW_ID,
        ParticipantDetails: {
            DisplayName: incomingData.ProfileName
        },
        Attributes: {
            Channel: "CHAT"
        }
    });

    const startChatContactResponse = await AWSCONNECT.send(command);

    if (startChatContactResponse) {

        const createParticipantCommand = new CreateParticipantConnectionCommand({
            ParticipantToken: startChatContactResponse.ParticipantToken,
            Type: ["WEBSOCKET", "CONNECTION_CREDENTIALS"]
        });

        const createParticipantResponse = await AWSCPC.send(createParticipantCommand);

        return {
            awsContactId: startChatContactResponse.ContactId,
            awsParticipantId: startChatContactResponse.ParticipantId,
            awsConnectionToken: createParticipantResponse.ConnectionCredentials.ConnectionToken,
            awsConnectionExpiry: createParticipantResponse.ConnectionCredentials.Expiry,
            awsWebsocketUrl: createParticipantResponse.Websocket.Url,
            awsWebsocketExpiry: createParticipantResponse.Websocket.ConnectionExpiry
        };
    }
}

let sendMessageToChat = async ({ connectionToken, incomingData }) => {
    const sendMessageCommand = new SendMessageCommand({
        ConnectionToken: connectionToken,
        Content: incomingData.Body,
        ContentType: "text/plain"
    });

    const response = await AWSCPC.send(sendMessageCommand);
}

module.exports = {
    initializeChat,
    sendMessageToChat
}