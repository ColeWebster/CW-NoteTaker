const express = require('express');
const fs = require('fs');
const path = require('path');
const api = require('./routes/apiroutes');
const html = require('./routes/htmlroutes');


const app = express();
const PORT = process.env.PORT || 3001;

// app.use
app.use(express.json());
app.use(express.urlencoded({extended: true}));
api.use('/api', api);
app.use(express.static('public'));


// Get Homepage
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

// Get Notes page
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});


// Wildcard
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

