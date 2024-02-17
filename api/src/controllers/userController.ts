import { Request, Response, NextFunction } from "express";
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
      throw Error("Missing parameter, request must include email and password");
    }
    const hash: string = await bcrypt.hash(password, 10);
    const user = userDatabase.createUser(email, hash);
    res.status(200).json(user);
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
    console.log(password);
    console.log(user);
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

  //   bcrypt
  //     .compare(req.body.password, user.password)
  //     .then((valid: boolean) => {
  //       if (!valid) {
  //         res
  //           .status(401)
  //           .json({ message: "Paire login/mot de passe incorrecte" });
  //       }
  //       res.status(201).json({
  //         userId: user._id,
  //         token: jtw.sign({ userId: user._id }, `${KEY}`, {
  //           expiresIn: "24h",
  //         }),
  //       });
  //     })
  //     .catch((error: Error) => res.status(500).json({ error }));
  // })
  // .catch((error: Error) => res.status(500).json({ error }));
};