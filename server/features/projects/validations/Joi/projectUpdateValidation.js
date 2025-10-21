const projectCreationValidation = require("./projectCreationValidation");

// Currently for the MVP we need the same validations as the creation of projects.
// But this file will use the same validation as the creation of projects
// with the support of modifying the validations for the update of projects
// if later we need it.
const projectUpdateValidation = (post) => projectCreationValidation(post);

module.exports = projectUpdateValidation;
