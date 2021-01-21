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
//Static website and assets

//Everything in public/ is accessible as-is
app.use(express.static('public'));

//Start the server
app.listen(httpPort, () => {
  console.log('Running at localhost:'+httpPort);
});
