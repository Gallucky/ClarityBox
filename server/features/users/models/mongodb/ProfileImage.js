const mongoose = require("mongoose");
const { DEFAULT_VALIDATION } = require("@utils/globalValidations");
const { URL } = require("@features/users/helpers/localValidations");

// Defining the Name schema.
const ProfileImageSchema = new mongoose.Schema({
    url: URL,
    alt: DEFAULT_VALIDATION,
});

module.exports = ProfileImageSchema;
