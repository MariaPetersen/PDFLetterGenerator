import { ILetterData } from "../../interfaces/ILetterData";
const ejs = require("ejs");
const puppeteer = require("puppeteer");
const path = require("path");

const generatePdf = async (templateFileName: string, data: ILetterData) => {
  const templateFile = path.resolve(__dirname, "templates", templateFileName);
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
          console.log("here");
          const browser = await puppeteer.launch({
            headless: "new",
          });
          console.log("here");
          const page = await browser.newPage();
          console.log("here");
          await page.setContent(html);
          console.log("here");
          const pdf = await page.pdf({
            format: "A4",
          });
          console.log("here");
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
