import { Request, Response, NextFunction } from "express";
const { generatePdf } = require("./../services/pdfGenerator/generatePdfFile");

exports.generateLetterPdf = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { receiver, sender, paragraphs, object, greeting } = req.body;
    if (!receiver || !sender || !paragraphs || !object || !greeting) {
      throw Error(
        "Missing parameter, request must include receiver, sender and paragraphs"
      );
    }
    const data = {
      receiver,
      sender,
      paragraphs,
      object,
      greeting,
    };
    const pdf = await generatePdf("letter.ejs", data);

    res.contentType("application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=letter.pdf");

    res.send(pdf);

    next();
  } catch (e) {
    res.status(400);
  }
};
