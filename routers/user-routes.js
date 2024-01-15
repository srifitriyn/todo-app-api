const router = require("express").Router();
const { getUsers, register, login } = require("../controllers/user-controller");

router.get("/users", getUsers);
router.post("/register", register);
router.post("/login", login);

module.exports = router;