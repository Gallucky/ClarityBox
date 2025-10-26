const taskCreationValidation = require("./taskCreationValidation");

// Currently for the MVP we need the same validations as the creation of posts.
// But this file will use the same validation as the creation of posts with the support
// of modifying the validations for the update of posts if later we need it.
const taskUpdateValidation = (post) => taskCreationValidation(post);

module.exports = taskUpdateValidation;
