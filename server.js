// Import express package
const express = require("express");
const path = require("path");
const api = require("/index.js");

// Open variable port
const PORT = process.env.PORT || 3001;

const app = express();

// app.use
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', api);

app.use(express.static("public"));

// Get route home page
app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// Get route for notes page
app.get("/notes", (req,res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"))
});

app.get("*", (req,res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"))
});

// Variable for heroku
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
