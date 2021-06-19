const WebSocket = require('ws');
const AWSConnectService =  require("./aws-connect");
const TwilioService = require("./twillio-client");
const ENV = require("../config/env");

let activeClientList = [];

let initializeConnection = awsConnectResponse => {
    const ws = new WebSocket(awsConnectResponse.webSocketUrl);

    ws.onerror = function () {
        console.log("Websocket::Connection Error");
    };

    ws.on('open', function open() {
        console.log("WebSocket::Client Connected");
        ws.send(JSON.stringify({
            topic: "aws/subscribe",
            content: { topics: ["aws/chat"] }
        }));
    });

    ws.on('message', function incoming(e) {
        const { content } = JSON.parse(e);

        if (typeof content === "string") {
            const socketMessage = JSON.parse(content);
            console.log(socketMessage);
            return;
            console.log("CONNECT::", socketMessage.ParticipantRole, "::", socketMessage.ContentType, "::", socketMessage.Content);
            if(socketMessage.ContentType === "application/vnd.amazonaws.connect.event.participant.joined" && socketMessage.ParticipantRole === "AGENT") {
                AWSConnectService.sendMessageToChat({ connectionToken: awsConnectResponse.connectionToken, incomingData: { Body: "hello" } });
            }

            if (socketMessage.ContentType === "text/plain" && socketMessage.ParticipantRole === "AGENT") {
                TwilioService.sendMessage(socketMessage.Content, ENV.CONNECT_SOURCE_NUMBER);
            }
        }
    });

    awsConnectResponse.client = ws;
    const socketExist = activeClientList.find(v => v.customerNumber === masterConnectData.From);
    !socketExist && activeClientList.push(awsConnectResponse);

}

module.exports = {
    activeClientList,
    initializeConnection
};