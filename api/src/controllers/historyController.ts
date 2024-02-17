import { Response, NextFunction } from "express";
import { IAuthRequest } from "./../interfaces/IAuthRequest";
import { IPdf } from "../interfaces/IPdf";
const pdfDatabase = require("./../services/database/pdfDatabase");

exports.getHistory = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.auth;

    const pdfsHistory = await pdfDatabase.getUserPdfs(userId);

    res.contentType("application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=letter.pdf");

    res.send(pdfsHistory);
  } catch (e) {
    res.status(400);
  }
};
exports.deleteHistory = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.auth;
    const { id } = req.params;

    const pdfsHistory = await pdfDatabase.getUserPdfs(userId);
    const pdfToDelete = pdfsHistory.find(
      (pdf: IPdf) => pdf.pdf_id === parseInt(id)
    );
    console.log(pdfToDelete);
    if (!pdfToDelete) {
      throw Error("User doesn't have a pdf with the given id");
    }

    await pdfDatabase.deleteUserPdf(pdfToDelete.pdf_id);

    res.contentType("application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=letter.pdf");

    res.send("Deleted succesfully");
  } catch (e) {
    res.status(400);
  }
};
