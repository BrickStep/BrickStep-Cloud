/**
 * Created by Bowie on 2016/4/25.
 */
var express = require('express');
var router = express.Router();
var sql = require('mysql');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var mode = req.query['mode'];
    var username = req.query['username']
    var score = req.query['score'];
    var reqarray = [process.env['score_id']++,username,score];
    console.log(reqarray);
    if (score == null || username == null) {
        console.error("input is null");
        next();
        return;
    }
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
        host     : 'us-cdbr-iron-east-03.cleardb.net',
        user     : 'b0a6777de6b104',
        password : '071bc89e',
        database : 'ad_8dc3cd0f6b0352c'
    });

    var requestsql ="INSERT INTO "+ mode +" (id, username, score) VALUES ('"+reqarray[0]+"','"+reqarray[1]+"','"+reqarray[2]+"') " +
        "               ON DUPLICATE KEY UPDATE username='"+reqarray[1]+"', score='"+reqarray[2]+"';";
    console.log(requestsql);
    //next();
    //return;
    connection.connect();
    connection.query(requestsql,function (err,result) {

        if (err){
            return connection.rollback(function() {
                throw err;
            });
        }
        console.log(result);
        res.send(result);
        //connection.release();

    });
    console.log(connection.query);
    connection.commit(function (err) {
        if (err){
            throw err;
        }
        ///connection.destory();

    });

    connection.end(function (err) {
        console.log("connection ends");
    });
    //connection.destroy();
    //next();
});

module.exports = router;
