const WebSocket = require('ws');

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

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    awsConnectResponse.client = ws;
    const socketExist = activeClientList.find(v => v.customerNumber === masterConnectData.From);
    !socketExist && activeClientList.push(awsConnectResponse);

}

module.exports = {
    activeClientList,
    initializeConnection
};