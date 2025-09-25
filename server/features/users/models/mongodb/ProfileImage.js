const mongoose = require("mongoose");
const { URL, DEFAULT_VALIDATION } = require("../../../../utils/globalValidations");

// Defining the Name schema.
const ProfileImageSchema = new mongoose.Schema({
    url: URL,
    alt: DEFAULT_VALIDATION,
});

module.exports = ProfileImageSchema;
