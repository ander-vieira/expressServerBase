const fs = require('fs');
const handlebars = require('handlebars');

/////////////////////////////////////
//Compile templates

//Templates are read from the .hbs text files and compiled into functions
var userTemplate = handlebars.compile(fs.readFileSync('templates/userTemplate.hbs').toString());

/////////////////////////////////////
//Generate full HTML pages

//Generate a user's page using the user's id (extracted from the URL)
function generateUserPage(id) {
  //Set all the params to pass the template (in practice, it would be getting them from a database or such)
  var pageTitle = "User "+id+" - Example site";
  var userName = "User"+id;
  var userDescription = "This is this user's description";

  //Generate HTML using the compiled templates and specified params
  return userTemplate({"title": pageTitle, "name": userName, "description": userDescription});
}

module.exports = {
  generateUserPage: generateUserPage
};
