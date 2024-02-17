const { generateLetterPdf } = require("../controllers/generatePdfController");
const pdfRouter = require("./router");

pdfRouter.post("/", generateLetterPdf);
module.exports = pdfRouter;
