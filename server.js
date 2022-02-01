const express = require("express");
const path = require("path");
const { clog } = require('./middleware/clog');
const index = require("./routes/index");
const api = require("./routes/apiroutes");

const PORT = process.env.PORT || 3001;

app.use(clog);

// app.use
app.use(express.json());
app.use(express.urlencoded({extended: true}));
api.use("/api", api);

app.use(express.static("public"));



// Get home page
app.get('/', (req,res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Get Notes page
app.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});

// Wildcard - Get homepage
app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
