import { ILetterData } from "../interfaces/ILetterData";

class Api {
  private token: string | null;
  constructor() {
    this.token = localStorage.getItem("token");
  }

  async generateLetterPDF(data: ILetterData, free?: boolean) {
    let url
    if (free) {
      url = `${process.env.REACT_APP_API}/generatePdf/free`
    } else {
      url = `${process.env.REACT_APP_API}/generatePdf`
    }
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(data),
    });
    return response;
  }

  async generateUpdatedPDF(data: ILetterData, id: string) {
    const response = await fetch(
      `${process.env.REACT_APP_API}/generatePdf/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(data),
      }
    );
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
  async isAuthenticated() {
    const response = await fetch(`${process.env.REACT_APP_API}/user/isAuth`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
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
  async getPdfById(id: string) {
    const response = await fetch(`${process.env.REACT_APP_API}/history/${id}`, {
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
