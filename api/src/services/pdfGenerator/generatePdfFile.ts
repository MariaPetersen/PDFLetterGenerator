import { ILetterData } from "../../interfaces/ILetterData";
const ejs = require("ejs");
const puppeteer = require("puppeteer");
const path = require("path");

const generatePdf = async (templateFileName: string, data: ILetterData) => {
  const templateFile = path.resolve(__dirname, "../../templates", templateFileName);
  console.log(templateFile);
  return new Promise((resolve, reject) => {
    try {
      ejs.renderFile(
        templateFile,
        data,
        {},
        async function (err: Error, html: string) {
          if (err) {
            throw new Error("Something went wrong when generating PDF");
          }
          const browser = await puppeteer.launch({
            headless: "new",
          });
          const page = await browser.newPage();
          await page.setContent(html);
          const pdf = await page.pdf({
            format: "A4",
          });
          await browser.close();
          resolve(pdf);
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = { generatePdf };
