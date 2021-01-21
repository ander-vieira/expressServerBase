//Execute a function after the DOM is loaded (similar to jQuery's $.ready())
function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

docReady(function() {
  console.log("Hello console!");
});

//Submit a form via AJAX and write the response into an element
docReady(function() {
  dataForm = document.getElementById("dataForm");
  dataResult = document.getElementById("dataResult");

  //If there's no form, don't try to do anything
  if(dataForm) {
    dataForm.addEventListener('submit', function(e) {
      //Get the value input into the form
      dataName = dataForm.querySelector('input[type="text"]').value;

      var httpRequest = new XMLHttpRequest();
      //Set the callback function for after getting a response
      httpRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          //If the target element exists, write the response into it
          if(dataResult) {
            dataResult.innerHTML = this.responseText;
          }
        }
      };

      //Set the request parameters and send form input (as plain text)
      httpRequest.open("POST", "/form", true);
      httpRequest.send(dataName);

      //Prevent the form from submitting normally and loading a new page
      e.preventDefault();
    })
  }
});
