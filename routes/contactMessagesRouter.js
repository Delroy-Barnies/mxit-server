const { Router } = require("express");
const contactMessagesController = require("../controllers/contactMessagesController");
const usersController = require("../controllers/usersController");
const contactMessagesRouter = Router();
const multer = require("multer");
const upload = multer({ dest: 'uploads/' });

contactMessagesRouter.get("/:id", usersController.verifyToken, contactMessagesController.get);
contactMessagesRouter.post("/:id", usersController.verifyToken, upload.single('file'), contactMessagesController.add);
contactMessagesRouter.post("/reply/:id", usersController.verifyToken, upload.single('file'), contactMessagesController.addReply);

module.exports = contactMessagesRouter;