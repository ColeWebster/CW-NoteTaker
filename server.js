const express = require('express');
const fs = require('fs');
const path = require('path');
const htmlRoutes = require('./routes/htmlroutes');
const apiRoutes = require('./routes/apiroutes');

const app = express();
const PORT = process.env.PORT || 3001;

// app.use
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
api.use('/api', api);


// Get notes
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// Wildcard
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

