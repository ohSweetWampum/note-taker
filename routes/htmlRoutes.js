const path = require('path');
const express = require('express');
const router = express.Router();



// GET route for the notes page
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// Catch-all route
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
}); 


module.exports = router;