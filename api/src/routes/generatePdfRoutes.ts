const express = require("express");
const router = express.Router();
const generateLetterPdfCtrl = require("../controllers/generatePdfController");

router.post("/", generateLetterPdfCtrl.generateLetterPdfCtrl);

module.exports = router;
