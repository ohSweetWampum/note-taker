// Import express package
const express = require('express');
const path = require('path');

// Require the JSON file and assign it to a variable called `termData`
const dbData = require('./db.json');
const PORT = 3001;

// Initialize our app variable by setting it to the value of express()
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
// Add a static middleware for serving assets in the public folder
app.use(express.static('public'));



app.get('/notes', (req, res) => {
    res.send('This is an example GET request');
  });

  app.post('/example', (req, res) => {
    res.send('This is an example POST request');
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);


// GET route that returns any specific term
app.get('/api/term/:term', (req, res) => {
  const requestedTerm = req.params.term.toLowerCase();
    // http://localhost:3001/api/term/seo
    console.log("req.params", req.params);
    // http://localhost:3001/api/term/seo?t=moana
    console.log("req.query", req.query); 

  // Iterate through the terms name to check if it matches `req.params.term`
  if (requestedTerm) {
    for (let i = 0; i < termData.length; i++) {
      if (requestedTerm === termData[i].term.toLowerCase()) {
        return res.json(termData[i]);
      }
    }
  }

  // Return a message if the term doesn't exist in our DB
  return res.json('No term found');
});

// GET route for returning all terms from a given category
app.get('/api/terms/:category', (req, res) => {
  const requestedCategory = req.params.category.toLowerCase();
  const result = [];

  for (let i = 0; i < termData.length; i++) {
    const currentTermCategory = termData[i].category;
    if (requestedCategory === currentTermCategory) {
      result.push(termData[i]);
    }
  }
  return res.json(result);
});



// Routes
// http://localhost:3000/?t=The%20Goonies&apikey=farley
// { t: 'mean girls', apikey: 'farley' }
app.get('/', (req, res) => {
	console.log("req.query: ", req.query)
	if (req.query.t && req.query.apikey){
		const searchTitle = req.query.t.toLowerCase()
		console.log("searchTitle: ", searchTitle)
	

		for (let i = 0; i < movieData.length; i++) {
			if (movieData[i].Title.toLowerCase() === searchTitle) {
				return res.json(movieData[i]);
			}
		}
		// Return a message if the term doesn't exist in our DB
		return res.json({
			"Response": "False",
			"Error": "Movie not found!"
			});
	}else {
		res.json({
			"Response": "False",
			"Error": "No API key or Query provided."
			});
	};

  
});
