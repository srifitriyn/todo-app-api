const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Todo = require("./todo-model")

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    todos: [{ type: Schema.Types.ObjectId, ref: "Todo" }]
  },
  {
    timestamps: true,
    collection: "user"
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User