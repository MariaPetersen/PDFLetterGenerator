const { generateLetterPdf } = require("../controllers/generatePdfController");
const pdfRouter = require("./router");
const auth = require("./../middleware/auth");

pdfRouter.post("/", auth, generateLetterPdf);
module.exports = pdfRouter;
