const express = require('express');
const path = require('path');

const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

// app.use
app.use(express.json());
app.use(express.urlencoded({extended: true}));
api.use('/api', api);
app.use(express.static('public'));


// Get Notes page
app.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// Wildcard - Get homepage
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
