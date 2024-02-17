import { IPdf } from "../../interfaces/IPdf";
const { query } = require("./database");

exports.getUserPdfs = async (userId: string) => {
  const getUserPdfsQuery = `
    SELECT pdfs.pdf_id, pdfs.pdf_data, pdfs.created_at
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

exports.saveUserPdf = async (pdfData: string, userId: string) => {
  const saveUserPdfQuery =
    "INSERT INTO pdfs (pdf_data, user_id, created_at) VALUES ($1, $2, $3) RETURNING *";
  try {
    const createdAt: Date = new Date();
    const result = await query(saveUserPdfQuery, [pdfData, userId, createdAt]);
    const pdf: Array<IPdf> = result.rows;
    return pdf[0];
  } catch (e) {
    console.error(e + "Could not save pdf");
  }
};

exports.deleteUserPdf = async (pdfId: string) => {
  const saveUserPdfQuery = "DELETE FROM pdfs WHERE pdf_id = $1";
  try {
    await query(saveUserPdfQuery, [pdfId]);
    return;
  } catch (e) {
    console.error(e + "Could not delete pdf");
  }
};
