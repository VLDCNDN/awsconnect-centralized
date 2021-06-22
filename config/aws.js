const ENV = require("./env");
const { ConnectClient } = require("@aws-sdk/client-connect");
const { ConnectParticipantClient } = require("@aws-sdk/client-connectparticipant");
const ViberBot = require('viber-bot').Bot;

const AWSCONNECT = new ConnectClient({
    region: "ap-southeast-1",
    credentials: {
        accessKeyId: ENV.ACCESS_KEY,
        secretAccessKey: ENV.SECRET_ACCESS_KEY
    }
});

const AWSCPC = new ConnectParticipantClient({
    region: "ap-southeast-1",
    credentials: {
        accessKeyId: ENV.ACCESS_KEY,
        secretAccessKey: ENV.SECRET_ACCESS_KEY
    }
});

const TwilioClient = require("twilio")(
    ENV.TWILIO_ACCOUNT_SID,
    ENV.TWILIO_AUTH_TOKEN
);

const ViberBotClient = new ViberBot({
	authToken: ENV.VIBER_TOKEN,
	name: "TestPalconnect",
	avatar: "https://tehnoblog.org/wp-content/uploads/2019/01/Viber-App-Logo-1600x1600.png" // It is recommended to be 720x720, and no more than 100kb.
});

module.exports = { AWSCONNECT, AWSCPC, TwilioClient, ViberBotClient };