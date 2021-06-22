const WebSocket = require('ws');
const ENV = require("../config/env");
const AWSConnectService = require("./aws-connect");
const TwilioService = require("./twillio-client");
const TelegramService = require("./telegram");
const Viber = require("./viber");

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
            console.log("CONNECT::", socketMessage.ParticipantRole, "::", socketMessage.ContentType, "::", socketMessage.Content);
            console.log("SOCKETFULL::",socketMessage);
            if (socketMessage.ContentType === "application/vnd.amazonaws.connect.event.participant.joined" && socketMessage.ParticipantRole === "AGENT") {
                AWSConnectService.sendMessageToChat({ connectionToken: awsConnectResponse.awsConnectionToken, incomingData: { Body: awsConnectResponse.customerInitialMessage } });
            }

            if (socketMessage.ContentType === "text/plain" && socketMessage.ParticipantRole === "AGENT") {
                if (awsConnectResponse.source === "twilio") {
                    TwilioService.sendMessage(socketMessage.Content, awsConnectResponse.customerNumber);
                } else if (awsConnectResponse.source === "telegram") {
                    TelegramService.sendMessage(socketMessage.Content, awsConnectResponse.customerNumber);
                } else if (awsConnectResponse.source === "facebook") {

                } else if (awsConnectResponse.source === "viber") {
                    Viber.sendMessage(socketMessage.Content, awsConnectResponse.customerNumber);
                }
            }
        }
    });

    awsConnectResponse.client = ws;
    const socketExist = activeClientList.find(v => v.customerNumber === awsConnectResponse.customerNumber);
    !socketExist && activeClientList.push(awsConnectResponse);

}

module.exports = {
    activeClientList,
    initializeConnection
};