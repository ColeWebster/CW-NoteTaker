const express = require('express');

const notesRouter = require('./apiroutes');

const app = express();

app.use('/apirotues', apiRouter)

module.exports = app;