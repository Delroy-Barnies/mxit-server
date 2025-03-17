const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

exports.get = async (req, res) => {
    const decoded = jwt.decode(req.token);
    try {
        const currentUser = await prisma.user.findFirst({ where: { email: decoded.user.email }, include: { groups: true } });
        if (!currentUser) return res.status(404).json({ message: "Group not found" });
        res.json(currentUser.groups);
    } catch (error) {
    }
}

exports.add = async (req, res) => {
    const decoded = jwt.decode(req.token);
    const name = req.body.name;
    const memberIds = req.body.memberIds;
    try {
        memberIds.push(decoded.user.id);
        const newGroup = await prisma.group.create({ data: { adminId: decoded.user.id, name, members: { connect: memberIds.map(id => ({ id })) } }, include: { members: true } });
        res.json(newGroup);
    } catch (error) {
        res.status(500).json({ message: error });
    }

}

exports.addMember = async (req, res) => {
    const groupId = req.body.groupId;
    const memberId = req.body.memberId;
    try {
        await prisma.group.update({ where: { id: groupId }, data: { members: { connect: { id: memberId } } } });
        res.json({ message: "Member Added" });
    } catch (error) {
        res.status(500).json({ message: error });
    }

}

exports.update = async (req, res) => {
    const groupId = req.body.groupId;
    const name = req.body.name;
    try {
        const updatedGroup = await prisma.group.update({ where: { id: groupId }, data: { name } });
        res.json(updatedGroup);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

exports.delete = async (req, res) => {
    const groupId = req.body.groupId;
    try {
        await prisma.group.delete({ where: { id: groupId } });
        res.json({ message: "Group Deleted" });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

exports.deleteMember = async (req, res) => {
    const memberId = req.body.memberId;
    const groupId = req.body.groupId;
    try {
        await prisma.group.update({ where: { id: groupId }, data: { members: { disconnect: { id: memberId } } } });
        res.json({ message: "Member Removed" });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}