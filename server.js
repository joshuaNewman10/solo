var express = require('express');
var request = require('request');
var mongoose = require('mongoose');
var promise = require('bluebird');
var csv = require('fast-csv');
var db = require('./Public/Db/config.js');


var app = express();
app.use(express.static(__dirname + '/public'));

console.log('Server is listening on 8000');
app.listen(8000);

var dataStore = {
};

var storeCerealData = function(data, cb) {
  console.log(data, 'yay dataa!');
  data.forEach(function(row) {
    console.log('in datastore for each');
   var newCereal = new Cereal(
                              {'Cereal Name': row['Cereal Name'], 
                              'Manufacturer': row['Manufacturer'], 
                               'Calories': row['Calories'], 
                              'Protein (g)': row['Protein (g)'], 
                              'Fat': row['Fat'], 
                              'Sodium': row['Sodium'], 
                              'Carbs': row['Carbs'], 
                              'Sugars': row['Sugars']});
   newCereal.save(function(err, cereal) {
    console.log(cereal);
   });
                              
  });
  cb('added cereal data');
};

var storeWaterUseData = function(data) {

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
  });
});

// importData('Public/waterUse.csv', function(csvData, path) { //hello CB hell
//   parseData(csvData, path, function(data) {
//     cleanData(data, function(data) {
//       storeCerealData(function() {
//         console.log('data stored');
//       });
//     });
//   });
//   console.log('imported, parsed, cleaned data');
// });




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


