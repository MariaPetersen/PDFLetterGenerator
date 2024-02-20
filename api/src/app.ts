const express = require("express");
var cors = require("cors");
const dotenv = require("dotenv");
const userDatabase = require("./services/database/userDatabase")
const bcrypt = require("bcrypt")
const jtw = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";

const generatePdfRouter = require("./routes/generatePdfRoutes");
const userRouter = require("./routes/userRoutes");
const historyRouter = require("./routes/histoyRoutes");

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// app.get("/", async (req: Request, res: Response) => {
//   try {
//     const result = await db.query("SELECT * FROM users");
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
// });

//Routes
app.use("/generatePdf", generatePdfRouter);
app.use("/user", userRouter);
app.use("/history", historyRouter);

module.exports = app;
