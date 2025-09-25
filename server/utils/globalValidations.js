/* eslint-disable no-useless-escape */
// Global Shared Validations
// This file contains static global validations that are
// used in different parts of the application,
// thus any change will affect all the places.
// These validations are not dynamic and do not require
// any external data or context to function.

const URL = {
    type: String,
    match: RegExp(
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
    ),
    trim: true,
    lowercase: true,
};

const DEFAULT_VALIDATION = {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 256,
    trim: true,
    lowercase: true,
};

const EMAIL = {
    type: String,
    required: true,
    match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
    lowercase: true,
    trim: true,
    unique: true,
};

const PHONE = {
    type: String,
    required: true,
    match: RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/),
};

const CREATED_AT = {
    type: Date,
    default: Date.now,
};

const USER_ID = {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
};

const CREATED_BY = {
    ...USER_ID,
    required: true,
};

module.exports = {
    URL,
    DEFAULT_VALIDATION,
    EMAIL,
    PHONE,
    CREATED_AT,
    CREATED_BY,
    USER_ID,
};
