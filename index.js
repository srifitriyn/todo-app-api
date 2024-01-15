require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());

const mongoose = require("mongoose");
const url = process.env.MONGODB_URL;

mongoose.connect(url);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("we are connected"),
    app.listen(process.env.PORT, () => {
      console.log(`Listening to port: ${process.env.PORT}`);
    });
});

const userRouter = require("./routers/user-routes");
const todoRouter = require("./routers/todo-routes");

app.use("/user", userRouter);
app.use("/todoapp", todoRouter);