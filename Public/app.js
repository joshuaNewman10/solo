var parseData = function(dataRequest) {
  var dataOptions = ['Major Uses', 'Year', 'County'];
  var choice = dataOptions[0];
  for(var i=0; i<dataOptions.length; i++) {
    if( dataRequest.indexOf(dataOptions[i] ) > -1 ) {
      choice = dataOptions[i];
    }
  }
};


var onStart = function() { //load initial data

};

var requestData = function() { //request specific data

};



