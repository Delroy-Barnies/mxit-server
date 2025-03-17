require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();
const fs = require('fs').promises;

async function deleteFile(filePath) {
    try {
        await fs.unlink(filePath);
        console.log('File deleted successfully');
    } catch (err) {
        console.error(`Error deleting file: ${err.message}`);
    }
}

exports.updateName = async (req, res) => {
    const decoded = jwt.decode(req.token);
    const name = req.body.name;
    try {
        const updatedUser = await prisma.user.update({ where: { id: decoded.user.id }, data: { name } });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

exports.updateEmail = async (req, res) => {
    const decoded = jwt.decode(req.token);
    const email = req.body.email;
    try {
        const updatedUser = await prisma.user.update({ where: { id: decoded.user.id }, data: { email } });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

exports.saveWallpaper = async (req, res) => {
    const decoded = jwt.decode(req.token);
    let file = null;
    await cloudinary.uploader
        .upload(`uploads/${req.file.filename}`, {
            resource_type: "auto",
        })
        .then((result) => {
            file = result;
            console.log("success");
        })
        .catch((error) => {
            console.log("success", JSON.stringify(error, null, 2));
        })
    const updatedUser = await prisma.user.update({ where: { email: decoded.user.email }, data: { wallpaperUrl: file.url } });
    deleteFile(`uploads/${req.file.filename}`);
    res.json(updatedUser);
}

exports.getWallpaper = async (req, res) => {
    const decoded = jwt.decode(req.token);
    const user = await prisma.user.findFirst({ where: { email: decoded.user.email } });
    res.json(user.wallpaperUrl);
}

exports.saveProfilePic = async (req, res) => {
    const decoded = jwt.decode(req.token);
    let file = null;
    await cloudinary.uploader
        .upload(`uploads/${req.file.filename}`, {
            resource_type: "auto",
        })
        .then((result) => {
            file = result;
            console.log("success");
        })
        .catch((error) => {
            console.log("success", JSON.stringify(error, null, 2));
        })
    const updatedUser = await prisma.user.update({ where: { email: decoded.user.email }, data: { profilePicUrl: file.url } });
    deleteFile(`uploads/${req.file.filename}`);
    res.json(updatedUser);
}

exports.getProfilePic = async (req, res) => {
    const decoded = jwt.decode(req.token);
    const user = await prisma.user.findFirst({ where: { email: decoded.user.email } });
    res.json(user.profilePicUrl);
}