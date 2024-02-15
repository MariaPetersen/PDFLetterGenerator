import { Request, Response, NextFunction } from "express";
const { generatePdf } = require("./../services/pdfGenerator/generatePdfFile");

exports.generateLetterPdfCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { receiver, sender, paragraphs } = req.body;
    if (!receiver || !sender || !paragraphs) {
      throw Error(
        "Missing parameter, request must include receiver, sender and paragraphs"
      );
    }
    const data = {
      receiver,
      sender,
      paragraphs,
    };
    const pdf = await generatePdf("letter.ejs", data);
    console.log(pdf);

    res.contentType("application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=letter.pdf");

    res.send(pdf);

    next();
  } catch (e) {
    res.status(400);
  }
};
