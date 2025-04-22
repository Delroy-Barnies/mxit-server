const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

const ACCESS_TOKEN_SECRET = 'access_secret-key';
const REFRESH_TOKEN_SECRET = 'refresh_secret-key';

exports.get = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        if (!users) return res.status(404).json({ message: "No users registered" });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const rememberMe = req.body.remember;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'User does not exist with this email' });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const accessToken = jwt.sign({ user: user }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
        const refreshToken = jwt.sign({ user: user }, REFRESH_TOKEN_SECRET, { expiresIn: "32d" });
        await prisma.user.update(
            { where: { email }, data: { refresh: refreshToken } }
        )

        if (rememberMe) {
            res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
            res.send('Cookie has been set');
        } else {
            res.json({ accessToken, refreshToken });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

// Endpoint to refresh access token
exports.token = async (req, res) => {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
    const users = await prisma.user.findMany();
    const refreshTokens = users.map(user => {
        return user.refresh;
    })

    console.log(refreshTokens);
    console.log(refreshToken);

    if (!refreshToken || !refreshTokens.includes(refreshToken)) {
        return res.status(403).send('Refresh token not found');
    }

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send('Invalid refresh token');
        const accessToken = jwt.sign({ user: user }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        res.json({ accessToken });
    });
}

exports.register = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    const doesUserExist = await prisma.user.findFirst({ where: { email } });
    if (doesUserExist) return res.status(401).json({ message: "User already exists with this email" });

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
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader != 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}