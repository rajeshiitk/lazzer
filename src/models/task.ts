import mongoose from "mongoose";
// task Schema for simple todo application
const taskSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Please provide a title"] },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isEdit: { type: Boolean, default: false },
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
