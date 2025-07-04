const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/usersRouter');
const contactsRouter = require("./routes/contactsRouter");
const contactMessagesRouter = require("./routes/contactMessagesRouter");
const groupMessagesRouter = require("./routes/groupMessagesRouter");
const settingsRouter = require("./routes/settingsRouter");
const groupsRouter = require("./routes/groupsRouter");
const cors = require('cors');

// Middlewares
app.use(express.json());
app.use(cookieParser());

// CORS Setup
const allowedOrigins = [
    "http://localhost:5173",
    "https://mxit-delroy-barnies-projects.vercel.app",
    "https://mxit.vercel.app",
    "https://mxit-server.onrender.com"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Routes
app.use("/", usersRouter);
app.use("/contacts", contactsRouter);
app.use("/contacts/", contactMessagesRouter);
app.use("/settings/", settingsRouter);
app.use("/groups", groupsRouter);
app.use("/groups", groupMessagesRouter);

// Global error handling middleware (always last)
app.use((err, req, res, next) => {
    console.error(err.stack);
    if (err instanceof Error) {
        res.status(403).json({ message: err.message });
    } else {
        next();
    }
});

// Start Server
const PORT = process.env.PORT || 10000; 
app.listen(PORT, () => {
    console.log(`My first Express app - listening on port ${PORT}!`);
});