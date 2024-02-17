const userCtrl = require("../controllers/userController");
const userRouter = require("./router");
const userAuth = require("./../middleware/auth");

userRouter.post("/signup", userCtrl.signup);
userRouter.post("/login", userCtrl.login);
userRouter.get("/isAuth", userAuth, userCtrl.isAuth);

module.exports = userRouter;
