const express = require('express');

const app = express();

//The port number the server listens at (in local machine)
const httpPort = 3000;

var frontPageHits = 0;

/////////////////////////////////////
//Middleware

//When the front page is requested, increase hit counter
app.get('/', function(req, res, next) {
  frontPageHits++;

  console.log('Front page hits so far: '+frontPageHits);

  next();
});

/////////////////////////////////////
//AJAX calls / API hooks / form submits

// Example of an AJAX call / API hook
// Return the front page hit counter so far, as a JSON object
app.get('/ajax/hits', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ hits: frontPageHits }));
});

/////////////////////////////////////
//Static website and assets

//Everything in public/ is accessible as-is
app.use(express.static('public'));

//Start the server
app.listen(httpPort, () => {
  console.log('Running at localhost:'+httpPort);
});
