// Global Shared Validations
// This file contains static global validations that are
// used in different parts of the application,
// thus any change will affect all the places.
// These validations are not dynamic and do not require
// any external data or context to function.

const mongoose = require("mongoose");

const DEFAULT_VALIDATION = {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 256,
    trim: true,
};

const CREATED_AT = {
    type: Date,
    default: Date.now,
};

const USER_ID = {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
};

module.exports = {
    DEFAULT_VALIDATION,
    CREATED_AT,
    USER_ID,
};
