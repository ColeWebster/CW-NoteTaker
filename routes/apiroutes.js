// Check mini project for routing help
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');

const notes = express.Router();

notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post("/", (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const newNotes = {
      title,
      text,
      id: uuidv4()
    };
    
    readAndAppend(newNotes, './db/db.json');

    const response = {
      status: 'success',
      body: newNotes,
    };
    console.log("Testing to make sure it works")
    res.json(response);
  } else {
    res.json('Error in posting item');
  }
});

// GET Route for a specific tip
// notes.get('/:id', (req, res) => {
//   const notesId = req.params.id;
//   readFromFile('./db/db.json')
//     .then((data) => JSON.parse(data))
//     .then((json) => {
//       const result = json.filter((title) => title.id === noteId);
//       return result.length > 0
//         ? res.json(result)
//         : res.json('No note with that ID');
//     });
// });

// DELETE Route for a specific tip
notes.delete("/:id", (req, res) => {
  readFromFile("./db/db.json").then((rawData) => {
    const data = JSON.parse(rawData);
    const newNotes = data.filter((element) => {
      return element.id !== req.params.id;
    });
    if(newNotes !== data){
      writeToFile("./db/db.json", newNotes);
      console.log("note DELETE successful.")
      res.json(`Note sucessfully deleted.`);
    }
    else{
      res.json(`Error in deleting note. Could not be found.`);
    }
  });
});
    
module.export = notes;