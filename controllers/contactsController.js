const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

exports.add = async (req, res) => {
    const decoded = jwt.decode(req.token);
    const email = req.body.email;
    try {
        const currentUser = await prisma.user.findFirst({ where: { email: decoded.user.email }, include: { contacts: true } });
        if (!currentUser) return res.status(404).json({ message: "User not found" });
        const contactUser = await prisma.user.findFirst({ where: { email }, include: { contacts: true } });
        if (!contactUser) return res.status(404).json({ message: "User not found with this email" });
        let contactDoesExist = false;
        if (currentUser.contacts) {
            currentUser.contacts.forEach(contact => {
                if (contact.email === email) {
                    contactDoesExist = true;
                }
            });
        };
        if (contactDoesExist) return res.status(404).json({ message: "Contact already exists" });
        if (email === decoded.user.email) return res.status(404).json({ message: "You cannot add yourself as a contact" });
        const newContact = await prisma.user.update({ where: { email: decoded.user.email }, data: { contacts: { connect: { email } } }, include: { contacts: true } });
        res.json(newContact);
    } catch (error) {
        res.status(500).json({ message: error });
    }

}

/*exports.update = async (req, res) => {
    const decoded = jwt.decode(req.token);
    const email = req.body.email;
    const name = req.body.name;
    try {
        const currentUser = await prisma.user.findFirst({ where: { email: decoded.user.email }, include: { contacts: true } });
        const contactToUpdate = currentUser.contacts.find(contact => contact.email === email);
        if (!contactToUpdate) {
            return res.status(404).json({ message: "Contact not found" });
        }
        await prisma.contact.update({ where: { id: contactToUpdate.id }, data: { name } });
        const updatedUser = await prisma.user.findFirst({ where: { email: decoded.user.email }, include: { contacts: true } });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}*/

exports.delete = async (req, res) => {
    const decoded = jwt.decode(req.token);
    const email = req.body.email;
    try {
        const currentUser = await prisma.user.findFirst({ where: { email: decoded.user.email }, include: { contacts: true } });
        if (!currentUser) return res.status(404).json({ message: "User not found" });
        const contactToDelete = currentUser.contacts.find(contact => contact.email === email);
        if (!contactToDelete) {
            return res.status(404).json({ message: "Contact does not exist" });
        }
        const user = await prisma.user.update({ where: { email: decoded.user.email }, data: { contacts: { disconnect: { email } } } });
        res.json({ message: "Contact Deleted", user });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}
