// Check mini project for routing help
const notes = require("express").Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');

notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});



notes.post("/notes", (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const newNotes = {
      title,
      text,
      id: uuidv4()
    };
    
    readAndAppend(newNotes, "./db/db.json");

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
    
// notes.delete('/notes/:id', (req, res) => {
//   const id = req.params.id;
//   readFromFile('./db/db.json')
//   // If nested if statement.
    
//       res.json(`Item ${id} has been deleted 🗑️`);
//     });
// });





module.export = notes;