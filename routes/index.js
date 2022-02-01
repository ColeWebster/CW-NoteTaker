const express = require('express');

const apiRouter = require('./apiroutes.js');

const app = express();

app.use('/notes', apiRouter);

module.exports = app;