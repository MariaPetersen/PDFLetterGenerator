const express = require("express");
const { getHistory, getOnePdf, deleteHistory } = require("../controllers/historyController");
const historyRouter = express.Router();
const historyAuth = require("./../middleware/auth");

historyRouter.get("/", historyAuth, getHistory);
historyRouter.get("/:id", historyAuth, getOnePdf);
historyRouter.delete("/:id", historyAuth, deleteHistory);

module.exports = historyRouter;
export {}
