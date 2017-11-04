var express = require('express');
var bodyParser = require('body-parser');

var app = express();
// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
//
require('./app/routing/htmlRoutes')(app);
require('./app/routing/apiRoutes')(app);

app.set('port', (process.env.PORT || 5000));


// Initiate the listener.
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});