import { Response, NextFunction } from "express";
import { IAuthRequest } from "./../interfaces/IAuthRequest";
const pdfDatabase = require("./../services/database/pdfDatabase");
const { generatePdf } = require("./../services/pdfGenerator/generatePdfFile");

exports.generateLetterPdf = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { receiver, sender, paragraphs, object, greeting } = req.body;
    const { userId } = req.auth;
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

    const dataJson = JSON.stringify(data);

    const savedPdf = await pdfDatabase.saveUserPdf(dataJson, userId);

    if (!savedPdf) {
      throw Error("Something went wrong while saving pdf");
    }

    res.contentType("application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=letter.pdf");

    res.send(pdf);

    next();
  } catch (e) {
    res.status(400);
  }
};
