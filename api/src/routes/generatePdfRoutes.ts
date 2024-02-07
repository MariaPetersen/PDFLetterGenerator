const express = require("express");
const router = express.Router();
const generatePdfCtrl = require("../controllers/generatePdfController");
const generatePdfUseCases = require("../usecases/generatePdfUseCase");

router.post(
  "/",
  generatePdfCtrl.generateLetterPdfCtrl,
  generatePdfUseCases.generateLetterPdfUseCase
);

module.exports = router;
