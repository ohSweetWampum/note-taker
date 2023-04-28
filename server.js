// Import required packages and define variables
const express = require('express');
const path = require('path');

// Initialize app and set port
const app = express();
var PORT = process.env.PORT || 3001;

// Middleware to parse the JSON
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import and use your route files
const htmlRoutes = require('./routes/htmlRoutes');
const notesRoutes = require('./routes/apiRoutes');

// Use the imported routes
app.use('/', htmlRoutes);
app.use('/', notesRoutes);


// Add listener/start the server
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));
