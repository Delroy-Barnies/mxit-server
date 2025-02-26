const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/usersRouter');
const contactsRouter = require("./routes/contactsRouter");
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/", usersRouter);
app.use("/contacts", contactsRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`My first Express app - listening on port ${PORT}!`);
});