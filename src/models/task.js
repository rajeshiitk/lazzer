import mongoose from "mongoose";
// task Schema for simple todo application
const taskSchema = mongoose.Schema({
    title: { type: String, required: [true,"Please provide a title"] },
    description: { type: String, required: [true,"Please provide a description"] },
    status: { type: String, default: "pending" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;