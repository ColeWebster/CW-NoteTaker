const path = require('path');
const router = require('express').Router();

//get
router.get("/notes", (req,res)) => {
    res.sendFile(path.join(__dirname, ""))
});


module.exports = router