const {v4: uuidv4} = require('uuid');
const fs = require('fs');
const {readFromFile, writeToFile, readAndAppend} = require('../helpers/fsUtils')

const router = require("express").Router();


// Get
router.get('/notes', (req,res) => {
  readFromFile('./db/db.json').then(data => res.json(JSON.parse(data)))
});

// Post
router.post('/notes', (req,res) => {
  console.log('Checking')
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };
    readAndAppend(newNote, './db/db.json');
    const response = {
      status: 'success',
      body: newNote,
    };
    console.log("test")
    res.json(response);
  } else {
    res.error('Error when adding')
  }
});

module.exports = router;