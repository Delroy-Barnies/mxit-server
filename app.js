const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/usersRouter');
const contactsRouter = require("./routes/contactsRouter");
const contactMessagesRouter = require("./routes/contactMessagesRouter");
const groupMessagesRouter = require("./routes/groupMessagesRouter");
const settingsRouter = require("./routes/settingsRouter");
const groupsRouter = require("./routes/groupsRouter");
const cors = require('cors');
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

const allowedOrigins = [
    "http://localhost:5173",
    "https://mxit-delroy-barnies-projects.vercel.app",
    "https://mxit.vercel.app"
]

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

app.use("/", usersRouter);
app.use("/contacts", contactsRouter);
app.use("/contacts/", contactMessagesRouter);
app.use("/settings/", settingsRouter);
app.use("/groups", groupsRouter);
app.use("/groups", groupMessagesRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`My first Express app - listening on port ${PORT}!`);
});