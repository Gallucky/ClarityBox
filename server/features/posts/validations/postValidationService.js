const postCreationValidation = require("./Joi/postCreationValidation");
const postUpdateValidation = require("./Joi/postUpdateValidation");
const validator = process.env.VALIDATOR;

const validatePost = (post) => {
    if (validator === "Joi") {
        return postCreationValidation(post);
    }
};

const validatePostUpdate = (post) => {
    if (validator === "Joi") {
        return postUpdateValidation(post);
    }
};

module.exports = { validatePost, validatePostUpdate };
