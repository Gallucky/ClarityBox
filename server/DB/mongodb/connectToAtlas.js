const mongoose = require("mongoose");
const chalk = require("chalk");
const Log = require("@logger/loggers/customLogger");

const connectToAtlas = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        Log.info(chalk.magentaBright("Connected to Atlas MongoDB!"), { override: true });
    } catch (error) {
        console.error(chalk.redBright(error));
        throw error;
    }
};

module.exports = connectToAtlas;
