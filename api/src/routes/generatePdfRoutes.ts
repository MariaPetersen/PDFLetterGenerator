const express = require("express");
const {
  generateLetterPdfCtrl,
} = require("../controllers/generatePdfController");

const router = express.Router();

router.post("/", generateLetterPdfCtrl);
module.exports = router;
