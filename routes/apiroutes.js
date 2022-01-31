// Check mini project for routing help
const express = require('express')
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

const apiRouter = express.Router();

apiRouter.post('/', (req, res) => {
  console.log(req.body);
  const {title, topic} = req.body;
  if (req.body) {
    const newNotes = {
      title,
      topic,
      id: uuidv4(),
    };
    readAndAppend(newNotes, './db/db.json');
    res.json(`Note added succesfully`);
  } else {
    res.error('Error in adding note');
  }
});

apiRouter.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

apiRouter.get('/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((title) => title.id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
    });
});

apiRouter.delete('/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/tips.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all tips except the one with the ID provided in the URL
      const result = json.filter((title) => title.id !== noteId);

      // Save that array to the filesystem
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`Item ${noteId} has been deleted 🗑️`);
    });
});


module.export = apiRouter;