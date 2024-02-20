const express = require("express");
const { generateLetterPdf, generateUpdatedPdf } = require("../controllers/generatePdfController");
const pdfRouter = express.Router();
const auth = require("./../middleware/auth");

pdfRouter.post("/", auth, generateLetterPdf);
pdfRouter.post("/:id", auth, generateUpdatedPdf);

module.exports = pdfRouter;
export {}