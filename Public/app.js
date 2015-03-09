var parseData = function(dataRequest) {
  var dataOptions = ['Major Uses', 'Year', 'County'];
  var choice = dataOptions[0];
  for(var i=0; i<dataOptions.length; i++) {
    if( dataRequest.indexOf(dataOptions[i] ) > -1 ) {
      choice = dataOptions[i];
    }
  }
 //make http request
};

var
