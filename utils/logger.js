const winston = require("winston");
const conf = require("../constants");

const Logger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({ filename: conf.log }),
    new winston.transports.File({ filename: conf.error, level: "error" }),
    new winston.transports.Console()
  ]
});

module.exports = Logger;
