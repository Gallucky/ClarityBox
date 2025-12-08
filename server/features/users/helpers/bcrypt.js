const bcrypt = require("bcryptjs");

const generateUserPassword = (password) => bcrypt.hashSync(password, 10);

const comparePassword = async (password, hashedPassword) =>
    await bcrypt.compare(password, hashedPassword);

module.exports = {
    generateUserPassword,
    comparePassword,
};
