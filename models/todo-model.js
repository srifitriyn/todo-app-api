const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    isComplete: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: "todo",
  }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
