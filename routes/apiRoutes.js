const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const dbPath = path.join(__dirname, '../db.json');

// Function to read notes data from the JSON file
const readNotes = () => {
  const notesData = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(notesData);
};

// Function to write notes data to the JSON file
const writeNotes = (notes) => {
  fs.writeFileSync(dbPath, JSON.stringify(notes));
};

// GET route for retrieving all notes
router.get('/notes', (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

// POST route for adding a new note
router.post('/notes', (req, res) => {
  const notes = readNotes();
  const newNote = { ...req.body, id: Date.now() };
  notes.push(newNote);
  writeNotes(notes);
  res.json(newNote);
});

// DELETE route for deleting a note by ID
router.delete('/notes/:id', (req, res) => {
  const notes = readNotes();
  const noteId = parseInt(req.params.id);
  const updatedNotes = notes.filter((note) => note.id !== noteId);
  writeNotes(updatedNotes);
  res.json({ message: `Note with ID ${noteId} deleted` });
});

module.exports = router;
