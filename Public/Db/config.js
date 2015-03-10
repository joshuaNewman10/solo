var mongoose = require('mongoose');
var mongodb = require("mongodb");

mongoose.connect('mongodb://localhost/waterUseDB');

var db = mongoose.connection;


// 27017 is the default port for connecting to MongoDB
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('Mongodb connection open');
});

module.exports = db;
