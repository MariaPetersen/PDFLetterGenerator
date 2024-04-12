import { Response, NextFunction } from "express";
import { IAuthRequest } from "./../interfaces/IAuthRequest";
const pdfDatabase = require("./../services/database/pdfDatabase");
const { generatePdf } = require("./../services/pdfGenerator/generatePdfFile");
const { getLetterTemplateForType } = require("./../utils/letterTemplates");

exports.generateLetterPdf = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { receiver, sender, type } = req.body;
    if (!receiver || !sender || !type) {
      res
      .status(500)
      .json(
        "Missing parameter, request must include receiver, sender and type"
        );
      }
      
      const template = getLetterTemplateForType(req.body.type);
      
      const pdf = await generatePdf(template, req.body);
      
      const dataJson = JSON.stringify(req.body);
      
    const { userId } = req.auth;
    const savedPdf = await pdfDatabase.saveUserPdf(
      dataJson,
      userId,
      req.body.type
    );

    if (!savedPdf) {
      res.status(500).json("Something went wrong while saving pdf");
    }
    res.contentType("application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${req.body.type}.pdf`
    );

    res.send(pdf);

    next();
  } catch (e) {
    res.status(400);
  }
};
exports.generateLetterPdfFree = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("here")
    const { receiver, sender, type } = req.body;
    console.log(req.body)
    if (!receiver || !sender || !type) {
      res
      .status(500)
      .json(
        "Missing parameter, request must include receiver, sender and type"
        );
      }
      
    const template = getLetterTemplateForType(req.body.type);
    
    const pdf = await generatePdf(template, req.body);

    res.contentType("application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${req.body.type}.pdf`
    );

    res.send(pdf);

    next();
  } catch (e) {
    res.status(400);
  }
};

exports.generateUpdatedPdf = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { receiver, sender, type } = req.body;
    const { userId } = req.auth;
    const { id } = req.params;
    if (!receiver || !sender || !type) {
      res
        .status(500)
        .json(
          "Missing parameter, request must include receiver, sender and type"
        );
    }

    const template = getLetterTemplateForType(req.body.type);

    const pdf = await generatePdf(template, req.body);

    const dataJson = JSON.stringify(req.body);

    const savedPdf = await pdfDatabase.updateUserPdf(
      dataJson,
      req.body.type,
      id
    );

    if (!savedPdf) {
      res.status(500).json("Something went wrong while updating pdf");
    }

    res.contentType("application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${req.body.type}.pdf`
    );

    res.send(pdf);

    next();
  } catch (e) {
    res.status(400);
  }
};
