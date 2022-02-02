//Use path to path the express items
const path = require("path");
const router = require("express").Router();

// Notes
router.get("./notes", (req,res) => {
    res.sendFile(path.join(__dirname, "/public/notes"))
});



// Home page - Wildcard
router.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "/public/index"))
});

module.exports = router;