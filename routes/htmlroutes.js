//Use path to path the express items
const router = require("express").Router();
const path = require("path");

// Notes
router.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});

// Home page - Wildcard
router.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});

module.exports = router;