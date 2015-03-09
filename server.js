var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));

console.log('Server is listening on 4568');
app.listen(4568);


app.get('/', function() {

}); 