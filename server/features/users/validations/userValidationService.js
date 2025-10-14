const registerValidation = require("./Joi/registerValidation");
const loginValidation = require("./Joi/loginValidation");
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

module.exports = { validateRegistration, validateLogin };
