import { Request, Response, NextFunction } from "express";
import { IAuthRequest } from "./../interfaces/IAuthRequest";
const bcrypt = require("bcrypt");
const jtw = require("jsonwebtoken");
const dotenv = require("dotenv");
const userDatabase = require("./../services/database/userDatabase");

dotenv.config;

const KEY = process.env.RANDOM_KEY;

exports.signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(400)
        .json("Missing parameter, request must include email and password");
    }
    const alreadyExistingUser = await userDatabase.getOneUser(email);
    console.log(alreadyExistingUser);
    if (alreadyExistingUser) {
      res.status(400).json("Something went wrong during signup");
    }
    const hash: string = await bcrypt.hash(password, 10);
    const user = await userDatabase.createUser(email, hash);

    res.status(200).json({
      userId: user.user_id,
      token: jtw.sign({ userId: user.user_id }, `${KEY}`, {
        expiresIn: "24h",
      }),
    });
  } catch (e) {
    res.status(400);
  }
};

exports.login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw Error("Missing parameter, request must include email and password");
    }
    const user = await userDatabase.getOneUser(email);
    const valid = bcrypt.compare(password, user.password);
    if (!valid) {
      res.status(401).json({ message: "Paire login/mot de passe incorrecte" });
    }
    res.status(201).json({
      userId: user.user_id,
      token: jtw.sign({ userId: user.user_id }, `${KEY}`, {
        expiresIn: "24h",
      }),
    });
  } catch (e) {
    res.status(400);
  }
};
exports.isAuth = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.auth;

    const user = await userDatabase.getUserById(userId);

    if (!user) {
      res.status(401).json({ message: "User wasn't found" });
    }

    res.status(201).json({
      userId: user.user_id,
    });
  } catch (e) {
    res.status(400);
  }
};
