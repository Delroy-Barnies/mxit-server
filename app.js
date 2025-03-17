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
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

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