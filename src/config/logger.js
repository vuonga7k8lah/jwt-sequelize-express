const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");

const Logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message, ...metadata }) => {
            let msg = `${timestamp} [${level}]: ${message} `;
            if (metadata) {
                msg += JSON.stringify(metadata);
            }
            return msg;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
            filename: "logs/application-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            maxFiles: "14d",
        }),
    ],
});

module.exports = Logger;
