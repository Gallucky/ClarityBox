const bcrypt = require("bcryptjs");

const generateUserPassword = (password) => bcrypt.hashSync(password, 10);

const comparePassword = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);

module.exports = {
    generateUserPassword,
    comparePassword,
};
