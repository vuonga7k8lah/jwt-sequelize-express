const { version } = require("../../package.json");
const dotenv = require("dotenv").config();

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "AIT API documentation",
            version,
            license: {
                name: "MIT",
                url: "",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./routes/v1/index.js"],
};

module.exports = options;
