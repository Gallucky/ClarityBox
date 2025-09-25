const mongoose = require("mongoose");
const { DEFAULT_VALIDATION } = require("../../../../utils/globalValidations");

// Defining the Name schema.
const NameSchema = new mongoose.Schema({
    first: DEFAULT_VALIDATION,
    middle: {
        type: String,
        trim: true,
        required: false,
        validate: {
            validator: function (v) {
                return v.length === 0 || (v.length >= 2 && v.length <= 256);
            },
            message: "Value must be empty or between 2 and 256 characters",
        },
    },
    last: DEFAULT_VALIDATION,
});

module.exports = NameSchema;
