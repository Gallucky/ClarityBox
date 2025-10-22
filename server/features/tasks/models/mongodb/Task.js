const mongoose = require("mongoose");
const { DEFAULT_VALIDATION, CREATED_BY, CREATED_AT } = require("@utils/globalValidations");

// Defining the Task schema.
const TaskSchema = new mongoose.Schema({
    title: {
        ...DEFAULT_VALIDATION,
        maxLength: 50,
    },
    description: {
        ...DEFAULT_VALIDATION,
        maxLength: 500,
    },
    status: {
        type: String,
        enum: ["Pending", "In Progress", "Completed"],
        default: "Pending",
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Projects",
        required: true,
    },
    createdBy: CREATED_BY,
    createdAt: CREATED_AT,
    completedAt: {
        type: Date,
        default: null,
    },
});

// Creating and exporting the Task model.
const Task = mongoose.model("Tasks", TaskSchema);
module.exports = Task;
