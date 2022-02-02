// Import express package
const express = require("express");
const htmlRoutes = require("./routes/htmlroutes");

const app = express();
// Open variable port
const PORT = process.env.PORT || 3001;

// app.use borrowed from activity 20
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use('/', htmlRoutes);

// Status to know its live on a certain port and variable as needed from line 7
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);