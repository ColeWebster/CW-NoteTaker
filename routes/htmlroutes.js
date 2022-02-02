//Use path to path the express items
const path = require("path");
const router = require("express").Router();

// Notes
router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

//Wildcard
router.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
  });
  
module.exports = router;