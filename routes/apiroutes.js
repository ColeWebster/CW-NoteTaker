const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils')

const router = require("express").Router();


// Get
router.get('/', (req, res) => {
  readFromFile('./db/db.json').then(data => res.json(JSON.parse(data)))
});

// Post
router.post('/', (req, res) => {
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

router.delete('/'(req, res) => {
  readFromFile("./db/db.json").then((rawData) => {
    // Parse the data into a workable object.
    const data = JSON.parse(rawData);
    // Filter out any notes that math the ID given in the parameter.
    const newNotes = data.filter((element) => {
      return element.id !== req.params.id;
    });
    // If the newnotes is different from the data, write the new notes, and respond.
    if (newNotes !== data) {
      writeToFile("./db/db.json", newNotes);
      console.log("note DELETE successful.")
      res.json(`Note sucessfully deleted.`);
    }
    else {
      // If it wasn't different, let them know.
      res.json(`Error in deleting note. Could not be found.`);
    }
  });
});


module.exports = router;