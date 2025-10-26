const ENV = process.env.ENV;

const connectToDb = () => {
    if (ENV === "development") {
        require("@DB/mongodb/connectLocally");
    }
    if (ENV === "production") {
        require("@DB/mongodb/connectToAtlas");
    }
};

module.exports = connectToDb;
