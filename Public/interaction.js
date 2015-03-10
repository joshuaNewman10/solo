var desiredY = "Public Supply population served by groundwater, in thousands";

var parseDataRequest = function(dataRequest) {
  var dataOptions = {
    'Major Uses': 'LA', 
    'Year':  'Year',
    'County':  'County',
    '1985': '1985',
    '2010': '2010',
    'Agriculture': 'Irrigation, Crop self-supplied surface-water withdrawals for crops, fresh, in Mgal/d',
    'Commercial':'Public Supply deliveries to commercial, in Mgal/d',
    'Industry': 'Public Supply deliveries to industrial, in Mgal/d',
    'Per Capita': 'Public Supply per capita use, in gallons/person/day'
  };
  var choice = 'County';
  var yVar = 'County';
  var choices = Object.keys(dataOptions);
  for(var i=0; i<choices.length; i++) {
    if( dataRequest.indexOf(choices[i]) > -1 ) {
      choice = choices[i];
      yVar = dataOptions[choice];
    }
  }

  if( choice === 'Year' ) {
    render1985CSVData();
    showTimeControls();
  } else if (choice === '2010') {
    render2010CSVData();
  } else if (choice === 'Agriculture') {
    renderAgricultureData(yVar);
  } else if (choice === 'Commericial') {
    renderPerCapitaData(yVar);
  } else if (choice === 'Industry') {
    renderIndustryData(yVar);
  } else if (choice === 'Per Capita') {
    renderPerCapitaData(yVar);
  }else {
    renderCountyData(yVar);
  }
};

var showTimeControls = function() {
  $('.time').css('visibility', 'visible');
};

var requestData = function(url) { //request specific data
  $.ajax({
    url: url,
    success: function(data) {
      console.log('got back data!', data);
    },
    error: function(error) {
      console.log(error);
    }
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

requestData('Cereal');
setTimeout(function() {
  requestData('waterUse');
}, 20000);


