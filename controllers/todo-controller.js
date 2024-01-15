const Todo = require("../models/todo-model");
const mongoose = require("mongoose");
const url = process.env.MONGODB_URL;

mongoose.connect(url);

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.status(200).json({
      message: "Showing all todos",
      todos,
    });
  } catch (err) {
    res.status(500).send({
      message: "Internal server error",
      error: err.message,
    });
  }
};

const addTodo = async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).send({
        message: "Title can't be empty",
      });
    } else {
      const newTask = await Todo.create({
        title: req.body.title,
        description: req.body.description,
        isComplete: req.body.isComplete,
      });
      res.status(201).json({
        message: "Task added",
        newTask,
      });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateTodo = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send({
        message: "Invalid ID format",
      });
    } else {
      const result = await Todo.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          description: req.body.description,
          status: req.body.status,
        },
        { new: true }
      ).exec();
      if (!result) {
        return res.status(404).send({
          message: "No task found with this ID",
        });
      } else if (!req.body.title) {
        return res.status(400).send({
          status: "Failed",
          message: "Title can't be empty",
        });
      } else {
        return res.status(200).send({
          message: "Task successfully updated",
          result,
        });
      }
    }
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getTodoDetail = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send({
        message: "Invalid ID format",
      });
    } else {
      const result = await Todo.findById(req.params.id).exec();
      if (!result) {
        res.status(404).send({
          message: "No task found with this ID",
        });
      } else {
        res.status(200).send({
          message: "Showing detail task",
          result,
        });
      }
    }
  } catch (err) {
    console.error("Error fetching todo:", err);
    res.status(500).send({
      message: "Internal server error",
      error: err.message,
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send({
        message: "Invalid ID format",
      });
    } else {
      const result = await Todo.findByIdAndDelete(req.params.id).exec();
      if (!result) {
        return res.status(404).send({
          message: "No task found with this ID",
        });
      } else {
        return res.status(200).send({
          message: "Task deleted",
          result,
        });
      }
    }
  } catch (err) {
    console.error("Error deleting todo:", err);
    res.status(500).send({
      message: "Internal server error",
      error: err.message,
    });
  }
};

const deleteAllTodos = async (req, res) => {
  try {
    const result = await Todo.deleteMany({});
    if (!result) {
      return res.status(404).send({
        message: "No task found to delete",
      });
    } else {
      return res.status(200).send({
        message: "All tasks deleted",
      });
    }
  } catch (err) {
    console.error("Error deleting todo:", err);
    res.status(500).send({
      message: "Internal server error",
      error: err.message,
    });
  }
};

module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  getTodoDetail,
  deleteTodo,
  deleteAllTodos,
};
