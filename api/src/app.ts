const express = require("express");
var cors = require("cors");
const dotenv = require("dotenv");
import { Request, Response, NextFunction } from "express";

const generatePdfRoutes = require("./routes/generatePdfRoutes");

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

//Routes
app.use("/generatePdf", generatePdfRoutes);

module.exports = app;
