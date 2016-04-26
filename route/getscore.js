/**
 * Created by Bowie on 2016/4/25.
 */
var express = require('express');
var router = express.Router();
var sql = require('mysql');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var mode = req.query['mode'];
    if (mode =='n'){
        mode = 'normalscore'
    } else if(mode == 'z') {
        mode = 'zenscore'
    } else {
        console.error("mode is not correct");
        next();
        return;
    }


    //return;
    var connection = sql.createConnection({
        host     : process.env['dbURL'],
        user     : process.env['dbUsername'],
        password : process.env['dbPassword'],
        database : process.env['dbName']
    });

    //next();
    //return;
    connection.connect();
    connection.query("SELECT * FROM "+ mode +" ORDER BY score DESC LIMIT 10",function (err,result) {

        if (err){
            return connection.rollback(function() {
                throw err;
            });
        }
        console.log(result);
        //connection.release();
        res.send(JSON.stringify(result));

    });
    connection.end(function (err) {
        console.log("connection ends");
    });
    //connection.destroy();
    //next();
});

module.exports = router;
