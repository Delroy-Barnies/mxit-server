const { Router } = require("express");
const usersController = require("../controllers/usersController");
const usersRouter = Router();

usersRouter.post("/login", usersController.login);
usersRouter.post("/register", usersController.register);
usersRouter.post("/token", usersController.token);

module.exports = usersRouter;