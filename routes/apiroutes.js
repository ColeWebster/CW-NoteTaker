// Check mini project for routing help
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile, } = require('../helpers/fsUtils');

const notes = express.Router();

notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
  const { title, topic } = req.body;
  if (title && topic) {
    const newNotes = {
      title,
      topic,
      id: uuidv4(),
    };
    readAndAppend(newNotes, './db/db.json');

    const response = {
      status: 'success',
      body: newNotes,
    };

    res.json(response);
  } else {
    res.json('Error in posting item');
  }
});

notes.delete('/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((title) => title.id !== noteId);
      writeToFile('./db/db.json', result);
      res.json(`Item ${noteId} has been deleted 🗑️`);
    });
});


module.export = notes;