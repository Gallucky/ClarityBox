const mongoose = require("mongoose");
const { DEFAULT_VALIDATION, USER_ID } = require("@utils/globalValidations");
const { CREATED_BY } = require("@features/posts/helpers/localValidations");

// Defining the Post schema.
const PostSchema = new mongoose.Schema(
    {
        content: DEFAULT_VALIDATION,
        likes: [USER_ID],
        createdBy: CREATED_BY,
        isPublic: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

// Creating and exporting the Post model.
const Post = mongoose.model("Posts", PostSchema);
module.exports = Post;
