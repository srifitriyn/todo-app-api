const router = require("express").Router();
const {
  getTodos,
  addTodo,
  updateTodo,
  getTodoDetail,
  deleteTodo,
  deleteAllTodos,
} = require("../controllers/todo-controller");
const authenticateToken = require("../middleware/auth");

router.get("/todos", authenticateToken, getTodos);
router.post("/todos/add", authenticateToken, addTodo);
router.get("/todos/:id/detail", authenticateToken, getTodoDetail);
router.put("/todos/:id/update", authenticateToken, updateTodo);
router.delete("/todos/:id", authenticateToken, deleteTodo);
router.delete("/todos", authenticateToken, deleteAllTodos);

module.exports = router;