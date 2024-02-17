import { Request, Response, NextFunction } from "express";

export interface IAuthRequest extends Request {
  auth: {
    userId: string;
  };
}
