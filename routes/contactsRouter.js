const { Router } = require("express");
const contactsController = require("../controllers/contactsController");
const usersController = require("../controllers/usersController");
const contactsRouter = Router();

contactsRouter.post("/add", usersController.verifyToken, contactsController.add);
/*contactsRouter.post("/update", usersController.verifyToken, contactsController.update);*/
contactsRouter.delete("/delete", usersController.verifyToken, contactsController.delete);

module.exports = contactsRouter;