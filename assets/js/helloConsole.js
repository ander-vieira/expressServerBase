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

docReady(function() {
  dataForm = document.getElementById("dataForm");
  dataResult = document.getElementById("dataResult");

  if(dataForm) {
    dataForm.addEventListener('submit', function(e) {
      dataName = dataForm.querySelector('input[type="text"]').value;

      var httpRequest = new XMLHttpRequest();
      //Set the callback function for after getting a response
      httpRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          if(dataResult) {
            dataResult.innerHTML = this.responseText;
          }
        }
      };

      //Set the request parameters and send
      httpRequest.open("POST", "/form", true);
      //httpRequest.setRequestHeader('Content-Type', 'application/json');
      httpRequest.send(dataName);

      e.preventDefault();
    })
  }
});
