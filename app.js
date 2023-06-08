var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var app = express();
//Add body-parser middleware to handle JSON data
app.use(bodyparser.json());

// Add reference to the routes file
var scproute = require('./routes/api/scproute');



// bring in the database connect key
var db = require('./config/keys').mongoURI;



// Connect to mongo using mongoose.
// Here's where we start using promises
mongoose.connect( db, {useNewUrlParser: true, useUnifiedTopology: 
    true } )
     .then( function(){
    console.log('MongoDB connected...');
     })
     .catch( function( err ){
    console.log( err )
     });
    



//var port = 3000;
//Comment out port 3000 and set port 5000 or the production server's 
//preconfigured service port
var port = process.env.PORT || 5000;

// check this later
app.use('/api/scp', scproute)

app.get('/', function( req, res ){
res.json({reply:'Route for HOME path.'});
});
app.listen( port, function(){
 console.log('Server started on port:' + port);
});