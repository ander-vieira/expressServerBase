//Sends an AJAX request to get the front page hit counter
docReady(function() {
  var hitCounter = document.getElementById('hitCounter');

  //If a hit counter doesn't exist, don't send the request
  if(hitCounter) {
    sendAjax('/ajax/hits', function(responseText) {
      //Parse the JSON object received into a JS object
      response = JSON.parse(responseText);

      //Change the hit counter text using the received data
      hitCounter.innerText = 'Front page hits so far: '+response.hits;

      console.log('AJAX data loaded!');
    });
  }
});
