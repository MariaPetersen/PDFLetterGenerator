import { response } from "express";
import ILetterData from "../interfaces/ILetterData";

class Api {
  async generateLetterPDF(data: ILetterData) {
    const response = await fetch(`${process.env.REACT_APP_API}/generatePdf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
}

export default Api;
