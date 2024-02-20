import { IPdf } from "../../interfaces/IPdf";
const { query } = require("./database");

exports.getUserPdfs = async (userId: string) => {
  const getUserPdfsQuery = `
    SELECT pdfs.pdf_id, pdfs.pdf_data, pdfs.created_at, pdfs.type, pdfs.name
    FROM pdfs
    JOIN users ON pdfs.user_id = users.user_id
    WHERE users.user_id = $1
  `;
  try {
    const result = await query(getUserPdfsQuery, [userId]);
    const pdfs: Array<IPdf> = result.rows;
    return pdfs;
  } catch (e) {
    console.error(e + "Could not retrieve pdfs");
  }
};

exports.getOneUserPdf = async (userId: string, id: string) => {
  const getUserPdfsQuery = `
    SELECT pdfs.pdf_id, pdfs.pdf_data, pdfs.created_at, pdfs.type, pdfs.name
    FROM pdfs
    JOIN users ON pdfs.user_id = users.user_id
    WHERE users.user_id = $1 AND pdfs.pdf_id = $2;
  `;
  try {
    const result = await query(getUserPdfsQuery, [userId, id]);
    const pdf: Array<IPdf> = result.rows;
    return pdf[0];
  } catch (e) {
    console.error(e + "Could not retrieve pdfs");
  }
};

exports.saveUserPdf = async (pdfData: string, userId: string, type: string) => {
  const saveUserPdfQuery =
    "INSERT INTO pdfs (pdf_data, user_id, created_at, type, name) VALUES ($1, $2, $3, $4, $5) RETURNING *";
  try {
    const createdAt: Date = new Date();
    const pdfName: string = `${type}_${Date.now()}`;
    const result = await query(saveUserPdfQuery, [
      pdfData,
      userId,
      createdAt,
      type,
      pdfName,
    ]);
    const pdf: Array<IPdf> = result.rows;
    return pdf[0];
  } catch (e) {
    console.error(e + "Could not save pdf");
  }
};

exports.updateUserPdf = async (pdfData: string, type: string, id: string) => {
  const saveUserPdfQuery = `
    UPDATE pdfs
    SET pdf_data = $1, type = $2
    WHERE pdf_id = $3
    RETURNING *;`;
  try {
    const result = await query(saveUserPdfQuery, [pdfData, type, id]);
    const pdf: Array<IPdf> = result.rows;
    return pdf[0];
  } catch (e) {
    console.error(e + "Could not update pdf");
  }
};

exports.deleteUserPdf = async (pdfId: number) => {
  const saveUserPdfQuery = "DELETE FROM pdfs WHERE pdf_id = $1";
  try {
    await query(saveUserPdfQuery, [pdfId]);
    return;
  } catch (e) {
    console.error(e + "Could not delete pdf");
  }
};
