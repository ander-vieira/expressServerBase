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

//Send an AJAX request to an URL, with specified parameters
function sendAjax(url, callback, method, contentType, content) {
  if(!method) {
    method = "GET"; //Default method
  }

  var httpRequest = new XMLHttpRequest();
  //Set the callback function for after getting a response
  httpRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      callback(this.responseText);
    }
  };

  //Set the request parameters and send content
  httpRequest.open(method, url, true);
  if(contentType) {
    httpRequest.setRequestHeader('Content-Type', contentType);
  }
  httpRequest.send(content);
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

      sendAjax('/form', function(responseText) {
        dataResult.innerHTML = responseText;
      }, "POST", "text/plain", dataName);

      //Prevent the form from submitting normally and loading a new page
      e.preventDefault();
    })
  }
});
