const mongoose = require("mongoose");
const { DEFAULT_VALIDATION, CREATED_AT } = require("@utils/globalValidations");
const { CREATED_BY } = require("@features/projects/helpers/localValidations");

// Defining the Project schema.
const ProjectSchema = new mongoose.Schema({
    createdBy: CREATED_BY,
    createdAt: CREATED_AT,
    name: {
        ...DEFAULT_VALIDATION,
        maxLength: 100,
        required: false,
    },
    description: {
        ...DEFAULT_VALIDATION,
        maxLength: 1024,
        minLength: 0,
        required: false,
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
        },
    ],
    isPublic: {
        type: Boolean,
        default: false,
    },
});

// Creating and exporting the Project model.
const Project = mongoose.model("Projects", ProjectSchema);
module.exports = Project;
