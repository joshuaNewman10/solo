var parseDataRequest = function(dataRequest) {
  var dataOptions = ['Major Uses', 'Year', 'County', '1985', '2010'];
  var choice = dataOptions[0];
  console.log(dataRequest);
  for(var i=0; i<dataOptions.length; i++) {
    if( dataRequest.indexOf(dataOptions[i] ) > -1 ) {
      choice = dataOptions[i];
    }
  }
  if( choice === 'Year' ) {
    render1985CSVData();
    showTimeControls();
  } else if (choice === '2010') {
    render2010CSVData();
  }
};

var showTimeControls = function() {
  $('.time').css('visibility', 'visible');
};

var requestData = function(dataId) { //request specific data
  $.get('dataId', function(data) {
    renderDbData(data, dataId);
  });
};

var showLoading = function() {
  $('.Loading').show();
};

var hideLoading = function() {
  $('.Loading').hide();
};

$(document).ready(function() {
  $('button').on('click', function() {
    console.log('button clicked!');
    parseDataRequest($(this).html());
  });

  $('body').on('click', '.dot', function(event) {
    console.log('circle clicked!');
    var radius = $(this)[0]['r'].baseVal.value;
    console.log(event);
    var x = 0;
    var y = 0;
    if( radius > 15 ) {
      showLoading();
      loadDataWithoutLA();
    } else {
      console.log('do something else');
    }
  });
});



