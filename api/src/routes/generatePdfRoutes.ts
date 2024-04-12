const express = require("express");
const { generateLetterPdf, generateUpdatedPdf, generateLetterPdfFree } = require("../controllers/generatePdfController");
const pdfRouter = express.Router();
const auth = require("./../middleware/auth");

pdfRouter.post("/free", generateLetterPdfFree);
pdfRouter.post("/", auth, generateLetterPdf);
pdfRouter.post("/:id", auth, generateUpdatedPdf);

module.exports = pdfRouter;
export {}