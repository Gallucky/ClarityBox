const mongoose = require("mongoose");
const { DEFAULT_VALIDATION, EMAIL, CREATED_AT, PASSWORD } = require("@utils/globalValidations");
const NameSchema = require("./Name");
const ProfileImageSchema = require("./ProfileImage");

// Defining the User schema.
const UserSchema = new mongoose.Schema({
    name: NameSchema,
    nickname: { ...DEFAULT_VALIDATION, unique: true },
    email: EMAIL,
    password: PASSWORD,
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
