const registerValidation = require("./Joi/registerValidation");
const loginValidation = require("./Joi/loginValidation");
const updateValidation = require("./Joi/userUpdateValidation");
const validator = process.env.VALIDATOR;

const validateRegistration = (user) => {
    if (validator === "Joi") {
        return registerValidation(user);
    }
};

const validateLogin = (user) => {
    if (validator === "Joi") {
        return loginValidation(user);
    }
};

const validateUserUpdate = (user) => {
    if (validator === "Joi") {
        return updateValidation(user);
    }
};

module.exports = { validateRegistration, validateLogin, validateUserUpdate };
