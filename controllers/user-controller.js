const User = require("../models/user-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getUser = async (req, res) => {
  try {
    const todos = await User.find({});
    res.status(200).json({
      message: "Showing all users",
      todos,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send({
        status: "Failed",
        message: "Field can't be empty",
      });
    } else {
      const existedUser = await User.findOne({ email });
      if (existedUser) {
        return res.status(409).send({
          message:
            "Email already registered, please use different email or login with this email.",
        });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
          username,
          email,
          password: hashedPassword,
        });
        return res.status(200).send({
          message: "User succesfully registered.",
          newUser,
        });
      }
    }
  } catch (err) {
    console.error("Error registering user:", err);
    return res.status(500).send({
      message: "Internal server error",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).send({
      message: "User not found",
    });
  } else {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        message: "Invalid password",
      });
    } else {
      const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "8h",
      });
      res.status(201).send({ message: "login succesfully", token });
    }
  }
};

module.exports = {
  getUser,
  register,
  login,
};
