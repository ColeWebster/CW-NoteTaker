// Check mini project for routing help
const express = require('express')
const note = require('../CW-NoteTaker/db/db.store')
const router = require('express').Router();

router.get('/', (req,res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});




router.post('/', (req, res) => {
    console.log(req.body);
  
    const { username, topic, tip } = req.body;
  
    if (req.body) {
      const newTip = {
        username,
        tip,
        topic,
        tip_id: uuidv4(),
      };
  
      readAndAppend(newTip, './db/tips.json');
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding note');
    }
  });
    
  tips.delete('/:tip_id', (req, res) => {
    const tipId = req.params.tip_id;
    readFromFile('./db/tips.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all tips except the one with the ID provided in the URL
        const result = json.filter((tip) => tip.tip_id !== tipId);
  
        // Save that array to the filesystem
        writeToFile('./db/tips.json', result);
  
        // Respond to the DELETE request
        res.json(`Item ${tipId} has been deleted 🗑️`);
      });
  });
      

module.export = router;