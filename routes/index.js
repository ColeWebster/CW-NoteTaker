const express = require('express');

const apiRotuer = require('./apiroutes');

const app = express();

app.use('/apiroutes', apiRotuer)

module.exports = app;