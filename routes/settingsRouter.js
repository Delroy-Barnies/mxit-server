const { Router } = require("express");
const settingsController = require("../controllers/settingsController");
const usersController = require("../controllers/usersController");
const settingsRouter = Router();
const multer = require("multer");
const upload = multer({ dest: 'uploads/' });

settingsRouter.post("/name", usersController.verifyToken, settingsController.updateName);
settingsRouter.post("/email", usersController.verifyToken, settingsController.updateEmail);
settingsRouter.post("/wallpaper", usersController.verifyToken, upload.single('file'), settingsController.saveWallpaper);
settingsRouter.get("/wallpaper", usersController.verifyToken, settingsController.getWallpaper);
settingsRouter.post("/profilePic", usersController.verifyToken, upload.single('file'), settingsController.saveProfilePic);
settingsRouter.get("/profilePic", usersController.verifyToken, settingsController.getProfilePic);

module.exports = settingsRouter;