const mongoose = require("mongoose");
const {
    CREATED_AT,
    CREATED_BY,
    DEFAULT_VALIDATION,
    USER_ID,
} = require("../../../../utils/globalValidations");

// Defining the Post schema.
const PostSchema = new mongoose.Schema({
    content: DEFAULT_VALIDATION,
    likes: [USER_ID],
    createdAt: CREATED_AT,
    createdBy: CREATED_BY,
});

// Creating and exporting the Post model.
const Post = mongoose.model("Posts", PostSchema);
module.exports = Post;
