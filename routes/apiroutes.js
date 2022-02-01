// Check mini project for routing help

const { v4: uuidv4 } = require('uuid');
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');

const notes = require("express").Router();

notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notes.post("/", (req, res) => {
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

//  DELETE Route for a specific tip
// notes.delete("/:id", (req, res) => {
//   readFromFile("./db/db.json").then((data) => {
//     const data = JSON.parse(data);
//     const newNotes = data.filter((element) => {
//       return element.id !== req.params.id;
//     });
//     if(newNotes !== data){
//       writeToFile("./db/db.json", newNotes);
//       console.log("note DELETE successful.")
//       res.json(`Note sucessfully deleted.`);
//     }
//     else{
//       res.json(`Error in deleting note. Could not be found.`);
//     }
//   });
// });
    
tips.delete('/:tip_id', (req, res) => {
  const id = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all tips except the one with the ID provided in the URL
      const result = json.filter((title) => title.id !== id);

      // Save that array to the filesystem
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`Item ${id} has been deleted 🗑️`);
    });
});





module.export = notes;