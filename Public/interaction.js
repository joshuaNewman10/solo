var parseDataRequest = function(dataRequest) {
  var dataOptions = ['Major Uses', 'Year', 'County'];
  var choice = dataOptions[0];
  for(var i=0; i<dataOptions.length; i++) {
    if( dataRequest.indexOf(dataOptions[i] ) > -1 ) {
      choice = dataOptions[i];
    }
  }
};

var requestData = function(dataId) { //request specific data
  $.get('dataId', function(data) {
    renderDbData(data, dataId);
  });
};

$(document).ready(function() {
  $('button').on('click', function() {
    console.log('button clicked!');
    parseData($(this).html());
  });

  $('body').on('click', '.dot', function(event) {
    console.log('circle clicked!');
    var radius = $(this)[0]['r'].baseVal.value;
    console.log(event);
    var x = 0;
    var y = 0;
    if( radius > 15 ) {
      console.log('load county data');
    } else {
      console.log('do something else');
    }
  });
});



