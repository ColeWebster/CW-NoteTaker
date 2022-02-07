// Import express package
const express = require("express");
const path = require("path");
const api = require("./routes/index.js");


const PORT = process.env.PORT || 3001;
const app = express();
// app.use borrowed from activity 20
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use('/api', api);

// Notes
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req,res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

//Wildcard
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});


// Status to know its live on a certain port and variable as needed from line 7
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);