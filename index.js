const express = require('express');

const apiRouter = require("./routes/apiroutes");

const app = express();

app.use('/apiroutes', apiRouter);

module.exports = app; 