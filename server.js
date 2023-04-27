// Import required packages and define variables
const express = require('express');
const path = require('path');
const fs = require('fs');

// Read the JSON file and assign it to a variable called `noteData`
const noteData = JSON.parse(fs.readFileSync('./db.json', 'utf8'));

// Initialize app and set port
const app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.json(noteData);
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = Date.now();
  noteData.push(newNote);

  fs.writeFileSync('./db/db.json', JSON.stringify(noteData), 'utf8');
  res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  const updatedNoteData = noteData.filter(note => note.id !== noteId);

  fs.writeFileSync('./db/db.json', JSON.stringify(updatedNoteData), 'utf8');
  res.json(updatedNoteData);
});

// Start the server
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));
