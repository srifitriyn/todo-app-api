const router = require("express").Router();
const { register, getUser, login } = require("../controllers/user-controller");

router.get("/users", getUser)
router.post("/register", register);
router.post("/login", login);

module.exports = router;