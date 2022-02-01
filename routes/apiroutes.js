// Check mini project for routing help
const express = require('express');
// Random ID grabber
const { v4: uuidv4 } = require('uuid');
// Deconstructed for writing files
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');

const noteRouter = express.Router();

// Read data base and bring it in via JSON
noteRouter.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// Posting the note by taking  and saving as a new file, wrong format posts error.
noteRouter.post("/", (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const newNotes = {
      title,
      text,
      id: uuidv4()
    };
    // Adds to the data base
    readAndAppend(newNotes, "./db/db.json");
    // Confirmation
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

noteRouter.delete("/:id", (req, res) => {
  readFromFile("./db/db.json").then((database) => {
    const data = json.parse(database);
    const newNotes = data.filter((item) => {
      return item.id !== req.params.id;
    });
    if (newNotes !== data){
      writeToFile("./db/db.json", newNotes);
      console.log("Deleted")
      res.json(`Not sucessfully removed.`);
    }
    else{
      res.json(`Error in removing, not found`);
    }
  });
})

module.export = notesRouter;