const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

const TOKEN_SECRET = 'secret-key';

exports.get = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        if (!users) return res.status(404).json({ message: "No users registered" });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

exports.userData = async (req, res) => {
    const decoded = jwt.decode(req.token);
    res.json(decoded);
}

exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'User does not exist with this email' });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ user: user }, TOKEN_SECRET, { expiresIn: "2d" });
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'None' });
        res.status(200).json({ message: 'Logged in' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

exports.logout = async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'Strict',
        secure: true // Set to true if using HTTPS
    });
    res.status(200).json({ message: 'Logged out successfully' });
}

exports.register = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    const doesUserExist = await prisma.user.findFirst({ where: { email } });
    if (doesUserExist) return res.status(401).json({ message: "User already exists with this email!" });

    if (password != confirmPassword) {
        return res.status(401).json({ message: "Passwords do not match!" })
    }

    bcrypt.hash(password, 10, async (err, hashedPassword) => {
        if (err) return next(err);
        const user = await prisma.user.create({
            data: {
                name: name,
                password: hashedPassword,
                email: email
            }
        });
        res.json([user]);
    });
}

exports.verifyToken = (req, res, next) => {
    const token = req.cookies.token; // 👈 read from cookie
    req.token = token;
    if (!token) {
        return res.sendStatus(403); // Forbidden
    }
    try {
        const decoded = jwt.verify(token, TOKEN_SECRET);
        req.user = decoded; // You can now use req.user in routes
        next();
    } catch (err) {
        return res.sendStatus(403); // Invalid or expired token
    }
}