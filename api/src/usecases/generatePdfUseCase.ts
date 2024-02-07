import { Request, Response, NextFunction } from "express";

export const generateLetterPdfUseCase = (
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
    next();
  } catch (e) {
    res.status(400);
  }
};
