/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var path = require('path');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');
var score = require('./route/score')
var getscore = require("./route/getscore")
// create a new express server
var app = express();


// serve the files out of ./public as our main files
app.use(express.static(path.join(__dirname, '/public/www/')));
app.use('/score', score);
app.use('/getscore', getscore);
// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

var dbCred = appEnv.getServiceCreds('ClearDB MySQL Database-q0');

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
    process.env['score_id'] = 2;
    process.env['dbURL'] = dbCred['hostname'];
    process.env['dbPort'] = dbCred['port'];
    process.env['dbUsername'] = dbCred['username'];
    process.env['dbPassword'] = dbCred['password'];
    process.env['dbName'] = dbCred['name'];
    console.log(dbCred);
	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
