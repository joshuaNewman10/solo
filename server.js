var express = require('express');
var request = require('request');
var mongoose = require('mongoose');
var promise = require('bluebird');
var csv = require('fast-csv');

var app = express();
app.use(express.static(__dirname + '/public'));

console.log('Server is listening on 8000');
app.listen(8000);

var dataStore = {
};


var timeout = function (operation) { //clean row of data at timeout intervals
    setTimeout(function () {
        operation();
        timeout(operation);
    }, 10000);
};

var cleanData = function (data, cb) {
  data.forEach(function(row, i) {
    for(var prop in row) {
      if( row[prop] === '-') {
        console.log(row[prop], prop);
      }
    }
  });
};

var parseData = function (data, path, cb) {
  var headings = data[0];
  var body = data.slice(1);
  var objData = body.map(function(entry) {
   var obj = {};
   entry.forEach(function(val, i) {
     obj[headings[i]] = val; 
   });
   return obj;
  });
  dataStore[path] = objData;
  cb(dataStore[path]);
};


var importData = function (path, cb) {
  var csvData = [];
  csv
  .fromPath(path)
  .on('data', function(data) {
    csvData.push(data);
  })
  .on('end', function() {
    console.log('done reading csv data');
    cb(csvData, path);
  });
};


app.get('/Cereal', function(req, resp) {
  resp.send(dataStore['Public/Cereal.csv']);
});

app.get('/waterUse', function(req, resp) {
  resp.send(dataStore['Public/waterUse.csv']);
});

app.get('TimeCounty', function(req, resp) {
});


importData('Public/Cereal.csv', function(csvData, path) { //hello CB hell
  parseData(csvData, path, function(data) {
    cleanData(data, function() {
      console.log('cleaned data!');
    });
  });
  console.log('imported, parsed, cleaned data');
});
importData('Public/waterUse.csv', function(csvData, path) { //hello CB hell
  parseData(csvData, path, function(data) {
    cleanData(data, function() {
      console.log('cleaned data!');
    });
  });
  console.log('imported, parsed, cleaned data');
});











// importData('Public/waterUse.csv', function() {
//   console.log('loaded datastore');
//   cleanData(dataStore['Public/Cereal.csv'], function() {
//       console.log('cleaned data');
//     });
// });
// importData('Public/1985.csv', function() {
//   console.log('loaded datastore');
//   cleanData(dataStore['Public/Cereal.csv'], function() {
//       console.log('clened data');
//     });
// });
// importData('Public/2010.csv', function() {
//   console.log('loaded datastore');
//   cleanData(dataStore['Public/Cereal.csv'], function() {
//       console.log()
//     });
// });
// importData('Public/LA.csv', function() {
//   console.log('loaded datastore');
//   cleanData(dataStore['Public/Cereal.csv'], function() {
//       console.log()
//     });
// });
// importData('Public/SansLA.csv', function() {
//   console.log('loaded datastore');
//   cleanData(dataStore['Public/Cereal.csv'], function() {
//       console.log();
//     });
// });
// importData('Public/waterUse.csv', function() {
//   console.log('loaded datastore');
//   cleanData(dataStore['Public/Cereal.csv'], function() {
//       console.log();
//     });
// });


