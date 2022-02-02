const express = require("express");
const {v4: uuidv4} = require('uuid');
const {readFromFile, writeToFile, readAndAppend} = require('../helpers/fsUtils')

conster router = require("express").Router();

// Get
router.get('/notes', (req,res) => {
  readFromFile('./db/db.json').then(data => res.json(JSON.parse(data)))
});

// Post
router.post('/notes', (req,res) => {
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };
    readAndAppend(newNote, './db/db.json');
    res.json(`Note succesfully added`);
  } else {
    res.error('Error when adding')
  }
});

// Delete
router.delete('/notes', (req,res) => {
  const noteID = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) =>{
      const result = json.filter((title) => title.id !== id);
      writeToFile('./db/db.json', result);
      res.json(`Note ${id} was deleted`)
    });
});



module.exports = router;