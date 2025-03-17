const { Router } = require("express");
const groupMessagesController = require("../controllers/groupMessagesController");
const usersController = require("../controllers/usersController");
const groupMessagesRouter = Router();
const multer = require("multer");
const upload = multer({ dest: 'uploads/' });

groupMessagesRouter.get("/:id", usersController.verifyToken, groupMessagesController.get);
groupMessagesRouter.post("/:id", usersController.verifyToken, upload.single('file'), groupMessagesController.add);

module.exports = groupMessagesRouter;