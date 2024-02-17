import ILetterData from "../interfaces/ILetterData";
import { IUser } from "../interfaces/IUser";

class Api {
  private token: string | null;
  constructor() {
    this.token = localStorage.getItem("token");
  }

  async generateLetterPDF(data: ILetterData) {
    const response = await fetch(`${process.env.REACT_APP_API}/generatePdf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(data),
    });
    return response;
  }

  async loginUser(email: string, password: string) {
    const response = await fetch(`${process.env.REACT_APP_API}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return response;
  }

  async signUpUser(email: string, password: string) {
    const response = await fetch(`${process.env.REACT_APP_API}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return response;
  }

  async getHistory() {
    const response = await fetch(`${process.env.REACT_APP_API}/history`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    });
    return response;
  }

  async deleteHistory(pdfId: string) {
    const response = await fetch(
      `${process.env.REACT_APP_API}/history/${pdfId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
    return response;
  }
}

export default Api;
