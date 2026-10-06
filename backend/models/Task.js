// models/Task.js — Mongoose schema/model for a To-Do task
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  // Task text; required so empty tasks cannot be stored
  title: { type: String, required: true },
  // Whether the task is done; new tasks start as not completed
  completed: { type: Boolean, default: false },
  // Timestamp set automatically when the task is created
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Task", taskSchema);
