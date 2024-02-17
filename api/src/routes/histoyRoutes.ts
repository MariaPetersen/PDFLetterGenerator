const historyController = require("../controllers/historyController");
const historyRouter = require("./router");
const historyAuth = require("./../middleware/auth");

historyRouter.get("/", historyAuth, historyController.getHistory);
historyRouter.delete("/:id", historyAuth, historyController.deleteHistory);

module.exports = historyRouter;
