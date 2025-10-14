const mongoose = require("mongoose");
const { DEFAULT_VALIDATION, EMAIL } = require("@utils/globalValidations");
const NameSchema = require("./Name");
const ProfileImageSchema = require("./ProfileImage");

// Defining the User schema.
const UserSchema = new mongoose.Schema({
    name: NameSchema,
    nickname: { ...DEFAULT_VALIDATION, unique: true },
    email: EMAIL,
    password: {
        type: String,
        required: true,
        match: RegExp(/^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{9,}$/),
    },
    profileImage: ProfileImageSchema,
    isAdmin: {
        type: Boolean,
        default: false,
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
    createdAt: CREATED_AT,
});

// Creating and exporting the User model.
const User = mongoose.model("Users", UserSchema);
module.exports = User;
