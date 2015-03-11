var express = require('express');
var request = require('request');
var mongoose = require('mongoose');
var promise = require('bluebird');
var csv = require('fast-csv');
var db = require('./Public/Db/config.js');
var CerealModel = require('./Public/Db/models/Cereal');
var TimeCountyData = require('./Public/Db/models/TimeCountyUse');

// 
var app = express();
app.use(express.static(__dirname + '/public'));

console.log('Server is listening on 8000');
app.listen(8000);

var dataStore = {
};

var storeCerealData = function(data, cb) { //small dataset test
  data.forEach(function(row) {
   var newCereal = new CerealModel(
    {'name': row['Cereal Name'], 
    'manufacturer': row['Manufacturer'], 
     'calories': row['Calories'], 
    'protein (g)': row['Protein (g)'], 
    'fat': row['Fat'], 
    'sodium': row['Sodium'], 
    'carbs': row['Carbs'], 
    'sugars': row['Sugars']});
   newCereal.save(function(err, cereal) {
    // console.log(cereal);
   });
                              
  });
  cb('added cereal data');
};

var storeWaterUseCountyData = function(data, cb) { //store dataset for quick access
  data.forEach(function(row) {
    var countyUse = new TimeCountyData({
      totalPop: row['Total Population total population of area, in thousands'],
      county: row['county_nm'],
      perCapitaUse: row['Public Supply per capita use, in gallons/person/day'],
      year:  row['year']
    });
    countyUse.save(function(err, countyEntry) {
      // console.log(countyEntry);
    });
  });

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
        row[prop] = null;
      }
    }
  });
  cb(data);
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
  cb(objData);
};


var importData = function (path, cb) {
  var csvData = [];
  csv
  .fromPath(path)
  .on('data', function(data) {
    csvData.push(data);
  })
  .on('end', function() {
    cb(csvData, path);
  })
  .on('error', function() {
   return false;
  });
};

var getData = function(path, cb) {
  importData(path, function(csvData, path) {
    parseData(csvData, path, function(parsedData) {
       cleanData(parsedData, function(cleanData) {
        cb('finished');
      });
    });
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

getData('Public/Cereal.csv', function(done) {
  storeCerealData(dataStore['Public/Cereal.csv'], function() {
    console.log('done!');
    getServerData();
  });
});

getData('Public/waterUse.csv', function(done) {
  storeWaterUseCountyData(dataStore['Public/waterUse.csv'], function() {
    console.log('done!');
  });
});

var getServerData = function() {
  TimeCountyData.find({year: '2000'}, function(err, results) {
    console.log('do we have any results?', results);
  });
};


