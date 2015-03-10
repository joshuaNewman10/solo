var express = require('express');
var request = require('request');
var mongoose = require('mongoose');
var promise = require('bluebird');
var csv = require('ya-csv');

var app = express();
app.use(express.static(__dirname + '/public'));

console.log('Server is listening on 8000');
app.listen(8000);

var loadCSVData = function() { //read in csv data
  var reader = csv.createCsvStreamReader(process.openStdin());
  reader.addListener('Public/Cereal.csv', function(data) {
    console.log(data, 'hello?');
  });
  reader.addListener('end', function() {
    console.log('done');
  })
};

app.get('Cereal', function(req, resp) {

});

app.get('County', function(req, resp) {

});

app.get('TimeCounty', function(req, resp) {

});




loadCSVData();
