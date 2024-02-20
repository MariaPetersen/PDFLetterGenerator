const express = require("express");
const userRouter = express.Router();
const { signup, login, isAuth } = require("../controllers/userController");
const userAuth = require("./../middleware/auth");

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/isAuth", userAuth, isAuth);

module.exports = userRouter;
export {}
