const mongoose = require("mongoose");
const { DEFAULT_VALIDATION } = require("@utils/globalValidations");
const { CREATED_BY } = require("@features/tasks/helpers/localValidations");

// Defining the Task schema.
const TaskSchema = new mongoose.Schema(
    {
        title: {
            ...DEFAULT_VALIDATION,
            maxLength: 50,
            minLength: 3,
            required: false,
        },
        description: {
            ...DEFAULT_VALIDATION,
            maxLength: 500,
            minLength: 0,
            required: false,
        },
        status: {
            type: String,
            enum: ["pending", "in-progress", "completed"],
            default: "pending",
        },
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Projects",
            required: true,
        },
        completedAt: {
            type: Date,
            default: null,
        },
        createdBy: CREATED_BY,
    },
    { timestamps: true }
);

// Creating and exporting the Task model.
const Task = mongoose.model("Tasks", TaskSchema);
module.exports = Task;
