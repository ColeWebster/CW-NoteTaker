// Import express package
const express = require("express");
const apiRoutes = require("./routes/apiroutes");
const router = require("./routes/htmlroutes") 

const PORT = process.env.PORT || 3001;
const app = express();


// app.use borrowed from activity 20
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use('/htmlRoutes', router);

// Status to know its live on a certain port and variable as needed from line 7
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);