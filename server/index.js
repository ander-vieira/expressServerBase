const express = require('express');
const cron = require('node-cron');

const templates = require('./templates.js');

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

//These will parse request payloads of the right types into the req.body field for use
app.use(express.json()); // application/json
app.use(express.text()); // text/plain

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
  //Specify response type (optional)
  res.setHeader('Content-Type', 'application/json');

  //Generate the JSON object and send
  res.end(JSON.stringify({ hits: frontPageHits }));
});

//Example of a form submit handler (form submitted via AJAX)
app.post('/form', (req, res) => {
  //Response is sent as plaintext
  res.setHeader('Content-Type', 'text/plain');

  //Echo back the request (should also be in plaintext)
  res.send(req.body);
});

/////////////////////////////////////
//Dynamic/generated web pages

//Example of a dynamically generated page for "users", with user id as part of the URL
app.get('/user/:userId', (req, res) => {
  //Extract named parameters from the URL
  var userId = req.params['userId'];

  //Specify response type (optional)
  res.setHeader('Content-Type', 'text/html');

  //Generate the HTML and send
  res.send(templates.generateUserPage(userId));
});

/////////////////////////////////////
//Static web pages and assets

//Everything in public/ is accessible as-is
app.use(express.static('public'));

//Start the server
app.listen(httpPort, () => {
  console.log('Running at localhost:'+httpPort);
});
