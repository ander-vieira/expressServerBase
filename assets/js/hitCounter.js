//Sends an AJAX request to get the front page hit counter
docReady(function() {
  var hitCounter = document.getElementById('hitCounter');

  //If a hit counter doesn't exist, don't send the request
  if(hitCounter) {
    var httpRequest = new XMLHttpRequest();
    //Set the callback function for after getting a response
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //Parse the JSON object received into a JS object
        response = JSON.parse(this.responseText);

        //Change the hit counter text using the received data
        hitCounter.innerText = 'Front page hits so far: '+response.hits;

        console.log('AJAX data loaded!');
      }
    };

    //Set the request parameters and send
    httpRequest.open("GET", "/ajax/hits", true);
    httpRequest.send();
  }
});
