const { v4: uuidv4 } = require('uuid');
const path = require('path');
const express = require('express');
const notes = express.Router({mergeParams: true});

const { readFromFile, writeToFile } = require('../helpers/notesHelper.js');
const dbPath = path.join(__dirname, '../db/db.json');

// GET Route for retrieving all the notes
notes.get('/api/notes', (req, res) => {
  readFromFile(dbPath).then((data) => res.json(JSON.parse(data)));
});

// GET Route for a specific note
notes.get('/api/notes/:note_id', (req, res) => {
  const noteId = req.params.note_id;
  readFromFile(dbPath)
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.note_id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
    });
});

// DELETE Route for a specific note
notes.delete('/api/notes/:note_id', (req, res) => {
  const noteId = req.params.note_id;
  readFromFile(dbPath)
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes except the one with the ID provided in the URL
      const result = json.filter((note) => note.note_id !== noteId);

      // Save that array to the filesystem
      writeToFile(dbPath, result);

      // Respond to the DELETE request
      res.json(`Item ${noteId} has been deleted `);
    });
});

// POST Route for a new note
notes.post('/api/notes', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title: title,
      text: text,
      note_id: uuidv4(),
    };

    // Read existing notes, append the new note, and write the updated data to the file
    readFromFile(dbPath)
      .then((data) => JSON.parse(data))
      .then((json) => {
        json.push(newNote);
        return writeToFile(dbPath, json);
      })
      .then(() => res.json(`Note added successfully`))
      .catch((err) => {
        console.error(err); // Log the error to the console
        res.status(500).json(`Error in adding note`);
      });
  } else {
    res.status(400).json('Error in adding note');
  }
});

module.exports = notes;


















// const fs = require('fs');
// const path = require('path');
// const express = require('express');
// const router = express.Router();
// const dbPath = path.join(__dirname, '../db.json');

// // Function to read notes data from the JSON file
// const readNotes = () => {
//   const notesData = fs.readFileSync(dbPath, 'utf8');
//   return JSON.parse(notesData);
// };


// // Function to write notes data to the JSON file
// const writeNotes = (notes) => {
//   fs.writeFileSync(dbPath, JSON.stringify(notes));
// };

// // GET route for retrieving all notes
// router.get('/notes', (req, res) => {
//   const notes = readNotes();
//   res.json(notes);
// });

// // POST route for adding a new note
// router.post('/notes', (req, res) => {
//   const notes = readNotes();
//   const newNote = { ...req.body, id: Date.now() };
//   notes.push(newNote);
//   writeNotes(notes);
//   res.json(newNote);
// });

// // DELETE route for deleting a note by ID
// router.delete('/notes/:id', (req, res) => {
//   const notes = readNotes();
//   const noteId = parseInt(req.params.id);
//   const updatedNotes = notes.filter((note) => note.id !== noteId);
//   writeNotes(updatedNotes);
//   res.json({ message: `Note with ID ${noteId} deleted` });
// });

// module.exports = router;
