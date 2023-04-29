// Import required modules
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const express = require('express');
const notes = express.Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/notesHelper');

const dbPath = path.join(__dirname, '../db/db.json');

// GET Route for retrieving all the notes
notes.get('/notes', (req, res) => {
  console.log(dbPath);
  // Use the helper function to read from the file and return the data as a JSON object
  readFromFile(dbPath).then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note
notes.post('/notes', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  // Check if the request body has the necessary information
  if (req.body) {
    // Create a new note object with a unique ID
    const newNote = {
      title: title,
      text: text,
      id: uuidv4(),
    };

    // Use the helper function to read and append the new note
    readAndAppend(newNote, dbPath)
      .then(() => res.json(`Note added successfully`))
      .catch((err) => res.status(500).json('Error in adding note'));
  } else {
    res.status(400).json('Error in adding note');
  }
});

// DELETE Route for a specific note
notes.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;
  console.log(noteId);
  
  // Use the helper function to read from the file
  readFromFile(dbPath)
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes except the one with the ID provided in the URL
      const result = json.filter((note) => note.id !== noteId);

      // Save that array to the filesystem using the helper function
      writeToFile(dbPath, result);

      // Respond to the DELETE request
      res.json(`Item ${noteId} has been deleted `);
    });
});

// Export the notes router for use in other modules
module.exports = notes;




