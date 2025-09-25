const mongoose = require("mongoose");
const {
    DEFAULT_VALIDATION,
    CREATED_BY,
    CREATED_AT,
} = require("../../../../utils/globalValidations");

// Defining the Project schema.
const ProjectSchema = new mongoose.Schema({
    createdBy: CREATED_BY,
    createdAt: CREATED_AT,
    description: {
        ...DEFAULT_VALIDATION,
        maxLength: 1024,
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
        },
    ],
});

// Creating and exporting the Project model.
const Project = mongoose.model("Projects", ProjectSchema);
module.exports = Project;
