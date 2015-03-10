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

var parseData = function(data, path, cb) {
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
  cb();
};

var importData = function(path, cb) {
  var csvData = [];
  csv
  .fromPath(path)
  .on('data', function(data) {
    csvData.push(data);
  })
  .on('end', function() {
    console.log('done reading csv data');
    parseData(csvData,path, cb);
  });
};


app.get('Cereal', function(req, resp) {
});

app.get('County', function(req, resp) {
});

app.get('TimeCounty', function(req, resp) {
});


importData('Public/Cereal.csv', function() {
  console.log('logging datastore');
  console.log(dataStore);
});
// importData('Public/waterUse.csv', function() {
//   console.log('logging datastore');
//   console.log(dataStore);
// });
// importData('Public/waterUse.csv', function() {
//   console.log('logging datastore');
//   console.log(dataStore);
});
// importData('Public/1985.csv', function() {
//   console.log('logging datastore');
//   console.log(dataStore);
// });
// importData('Public/2010.csv', function() {
//   console.log('logging datastore');
//   console.log(dataStore);
// });
// importData('Public/LA.csv', function() {
//   console.log('logging datastore');
//   console.log(dataStore);
// });
// importData('Public/SansLA.csv', function() {
//   console.log('logging datastore');
//   console.log(dataStore);
// });
// importData('Public/waterUse.csv', function() {
//   console.log('logging datastore');
//   console.log(dataStore);
// });


