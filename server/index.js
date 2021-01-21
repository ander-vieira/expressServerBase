const express = require('express');
const cron = require('node-cron');

const app = express();

//The port number the server listens at (in local machine)
const httpPort = 3000;

var frontPageHits = 0;

/////////////////////////////////////
//Cron jobs (periodic tasks)

//Every day at 12 AM, clear the front page hit counter
cron.schedule('0 0 * * *', () => {
  console.log('Resetting front page hits...');
  mainSiteHits = 0;
});

/////////////////////////////////////
//Middleware

//When the front page is requested, increase hit counter
app.get('/', function(req, res, next) {
  frontPageHits++;

  console.log('Front page hits today: '+frontPageHits);

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
