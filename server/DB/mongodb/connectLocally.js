const mongoose = require("mongoose");
const chalk = require("chalk");
const Log = require("@logger/loggers/customLogger");

mongoose
    .connect(process.env.DB_URL)
    .then(() => Log.info(chalk.magentaBright("Connect Locally To MongoDB!"), { override: true }))
    .catch((error) => {
        console.error(chalk.redBright(error));
    });
