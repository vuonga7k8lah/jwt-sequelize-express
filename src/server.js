const express = require("express");
const app = express();
const path = require("path");
const { APIs_V1 } = require("./routes/v1/index");
const { options } = require("./docs/swaggerDef");
const { StatusCodes } = require("http-status-codes");

// Load environment variables.
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });

const cors = require("cors");
const bodyParser = require("body-parser");
const MessageFactory = require("./utils/messageFactory");

// Connect to the database.
require("./config/database.js");

// enable cors
app.use(cors());
app.options("*", cors());

// parse json request body
app.use(express.json());
app.use(bodyParser.json({ type: "application/*+json" }));

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "..", "client")));
    app.use("/image", express.static(path.join(__dirname, "..", "image")));
}

// parse urlencoded request body
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.text({ type: "text/html" }));

//
app.use("/assets", express.static("assets"));
app.use("/image", express.static(path.join(__dirname, "..", "image")));

//router
app.use("/v1/kcnd", APIs_V1);

//import document api
// const swaggerJsdoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");

// const specs = swaggerJsdoc(options);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

//Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    return res
        .status(StatusCodes.UNAUTHORIZED)
        .json(MessageFactory.error(err.message));
});

if (process.env.NODE_ENV === "production") {
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    });
}

app.listen(process.env.PORT, function () {
    console.log(
        "start! express server on port " +
            process.env.PORT +
            "-----------api---------" +
            "localhost:" +
            process.env.PORT +
            process.env.API_SPACE +
            process.env.API_VERSION
    );
});
