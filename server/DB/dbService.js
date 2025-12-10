const ENV = process.env.NODE_ENV;
const connectToAtlas = require("@DB/mongodb/connectToAtlas");
const connectLocally = require("@DB/mongodb/connectLocally");

const connectToDb = async () => {
    if (ENV === "production") return connectToAtlas();
    return connectLocally();
};

module.exports = connectToDb;
