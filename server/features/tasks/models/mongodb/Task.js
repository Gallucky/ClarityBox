const mongoose = require("mongoose");
const { DEFAULT_VALIDATION, CREATED_BY, CREATED_AT } = require("@utils/globalValidations");

// Defining the Task schema.
const TaskSchema = new mongoose.Schema({
    createdBy: CREATED_BY,
    createdAt: CREATED_AT,
    description: {
        ...DEFAULT_VALIDATION,
        maxLength: 1024,
    },
    status: {
        type: String,
        enum: ["Pending", "In Progress", "Completed"],
        default: "Pending",
    },
    completedAt: {
        type: Date,
        default: null,
    },
});

// Creating and exporting the Task model.
const Task = mongoose.model("Tasks", TaskSchema);
module.exports = Task;
