const notes = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

// Read data base and bring it in via JSON
notes.get("/", (req, res) => {
  console.info(`${req.method} request received for note`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notes.post("/api/notes", (req,res) => {
  console.info(`${req.method} request received to add a note}`);
  const { title, topic } = req.body;
  if (title && topic) {
    const newNote = {
      title,
      topic,
      note_id: uuidv4(),
    };
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedNotes = JSON.parse(data);
        parsedNotes.push(newNote);
        fs.writeFile('./db/db.json', JSON.stringify(parsedNotes, null, 4),
        (writerErr) =>
          writerErr
            ? console.error(writerErr)
            : console.info("Created a new note!")
        );
      }
    });

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response):
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting');
  }
});
    
note.delete("/:id", (req, res) => {
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

module.export = notes;