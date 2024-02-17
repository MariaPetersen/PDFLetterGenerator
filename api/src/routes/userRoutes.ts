const userCtrl = require("../controllers/userController");
const userRouter = require("./router");

userRouter.post("/signup", userCtrl.signup);
userRouter.post("/login", userCtrl.login);

module.exports = userRouter;
