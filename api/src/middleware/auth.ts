import { Response, NextFunction } from "express";
import { IAuthRequest } from "./../interfaces/IAuthRequest";
const jtw = require("jsonwebtoken");

const KEY = process.env.RANDOM_KEY;

module.exports = (req: IAuthRequest, res: Response, next: NextFunction) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    const decodedToken = jtw.verify(token, `${KEY}`);
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(403).json({ error: "unauthorized request." });
  }
};
