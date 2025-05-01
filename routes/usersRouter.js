const { Router } = require("express");
const usersController = require("../controllers/usersController");
const usersRouter = Router();

usersRouter.get("/users", usersController.get);
usersRouter.post("/login", usersController.login);
usersRouter.post("/logout", usersController.logout);
usersRouter.post("/register", usersController.register);
usersRouter.post("/token", usersController.token);

module.exports = usersRouter;