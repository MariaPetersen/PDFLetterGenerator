const app = require("./app");
const PORT = process.env.PORT || 8000;

app.post("/generatePdf", async (req: Request, res: Response) => {
  res.send({
    message: "pong",
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
