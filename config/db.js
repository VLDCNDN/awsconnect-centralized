const ENV = require("./env");
module.exports = {
    development: {
        dialect: "sqlite",
        storage: "./sqlite-dev.db"
    },
    test: {
        dialect: "sqlite",
        storage: "./sqlite-test.db"
    },
    production: {
        url: ENV.DATABASE_URL,
        dialect: 'postgres',
    },
};