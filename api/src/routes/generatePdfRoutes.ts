const generatePdfController = require("../controllers/generatePdfController");
const pdfRouter = require("./router");
const auth = require("./../middleware/auth");

pdfRouter.post("/", auth, generatePdfController.generateLetterPdf);
pdfRouter.post("/:id", auth, generatePdfController.generateUpdatedPdf);

module.exports = pdfRouter;
