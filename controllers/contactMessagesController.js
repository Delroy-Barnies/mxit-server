require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();
const cloudinary = require("cloudinary").v2;
const fs = require('fs').promises;

async function deleteFile(filePath) {
    try {
        await fs.unlink(filePath);
        console.log('File deleted successfully');
    } catch (err) {
        console.error(`Error deleting file: ${err.message}`);
    }
}

exports.get = async (req, res) => {
    const contactId = Number(req.params.id);
    try {
        const contact = await prisma.contact.findFirst({ where: { id: contactId }, include: { messages: true } });
        res.json(contact.messages);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

exports.add = async (req, res) => {
    const decoded = jwt.decode(req.token);
    const contactId = Number(req.params.id);
    const message = req.body.message;
    if (req.file) {
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
        const newMessage = await prisma.message.create({ data: { message: "", image: file.url, user: { connect: { id: decoded.user.id } }, contact: { connect: { id: contactId } } } });
        deleteFile(`uploads/${req.file.filename}`);
        res.json(newMessage);
    } else {
        try {
            const newMessage = await prisma.message.create({ data: { message, user: { connect: { id: decoded.user.id } }, contact: { connect: { id: contactId } } } });
            res.json(newMessage);
        } catch (error) {
            res.status(500).json({ message: error });
        }

    }
}

exports.addReply = async (req, res) => {
    const decoded = jwt.decode(req.token);
    const contactId = Number(req.params.id);
    const message = req.body.message;
    if (req.file) {
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
        const newMessage = await prisma.message.create({ data: { message: "", image: file.url, user: { connect: { id: contactId } }, contact: { connect: { id: decoded.user.id } } } });
        deleteFile(`uploads/${req.file.filename}`);
        res.json(newMessage);
    } else {
        try {
            const newMessage = await prisma.message.create({ data: { message, user: { connect: { id: contactId } }, contact: { connect: { id: decoded.user.id } } } });
            res.json(newMessage);
        } catch (error) {
            res.status(500).json({ message: error });
        }

    }
}