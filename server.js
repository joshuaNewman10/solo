var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));

console.log('Server is listening on 8000');
app.listen(8000);
