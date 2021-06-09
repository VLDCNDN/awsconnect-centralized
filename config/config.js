const ENV = require("./env");
const { ConnectClient } = require("@aws-sdk/client-connect");

const AWSCONNECT = new ConnectClient({
    region: "ap-southeast-1",
    credentials: {
        accessKeyId: ENV.ACCESS_KEY,
        secretAccessKey: ENV.SECRET_ACCESS_KEY
    }
});

// const TwilioClient = require("twilio")(
//     ENV.TWILIO_ACCOUNT_SID,
//     ENV.TWILIO_AUTH_TOKEN
// );

module.exports = { AWSCONNECT };

// module.exports = { AWS, TwilioClient };