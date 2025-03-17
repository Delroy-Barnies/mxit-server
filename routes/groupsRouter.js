const { Router } = require("express");
const groupsController = require("../controllers/groupsController");
const usersController = require("../controllers/usersController");
const groupsRouter = Router();
const multer = require("multer");
const upload = multer({ dest: 'uploads/' });

groupsRouter.get("/", usersController.verifyToken, groupsController.get);
groupsRouter.post("/add", usersController.verifyToken, groupsController.add);
groupsRouter.post("/addMember", usersController.verifyToken, groupsController.addMember);
groupsRouter.post("/update", usersController.verifyToken, groupsController.update);
groupsRouter.delete("/delete", usersController.verifyToken, groupsController.delete);
groupsRouter.delete("/deleteMember", usersController.verifyToken, groupsController.deleteMember)

module.exports = groupsRouter;