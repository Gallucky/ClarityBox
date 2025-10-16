const { USER_ID } = require("@utils/globalValidations");

const CREATED_BY = {
    ...USER_ID,
    required: true,
};

module.exports = { CREATED_BY };
