

const { v4: uuidv4 } = require('uuid');




const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const dbPath = path.join(__dirname, '../db.json');
// GET Route for retrieving all the tips
tips.get('/', (req, res) => {
  readFromFile('./db/tips.json').then((data) => res.json(JSON.parse(data)));
});

// GET Route for a specific tip
tips.get('/:tip_id', (req, res) => {
  const tipId = req.params.tip_id;
  readFromFile('./db/tips.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((tip) => tip.tip_id === tipId);
      return result.length > 0
        ? res.json(result)
        : res.json('No tip with that ID');
    });
});

// DELETE Route for a specific tip
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

// POST Route for a new UX/UI tip
tips.post('/', (req, res) => {
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
    res.json(`Tip added successfully 🚀`);
  } else {
    res.error('Error in adding tip');
  }
});

module.exports = tips;
















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
