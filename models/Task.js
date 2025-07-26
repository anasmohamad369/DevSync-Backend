const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },

    dueDate: Date,
    projectId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
