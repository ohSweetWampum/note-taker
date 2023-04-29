// Import required modules
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

// Export the notes router for use in other modules
module.exports = router;