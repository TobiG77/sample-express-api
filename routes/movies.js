var express = require('express');
var router = express.Router();

var AWS = require('aws-sdk'),
    DOC = require("dynamodb-doc");

router.get('/', function(req, res, next) {
    var params = {
        TableName: 'Movies'
    };

    console.log("request", req);
    console.log("resource", res);
    var docClient = new DOC.DynamoDB(new AWS.DynamoDB({region: 'ap-southeast-2' }));
    // var docClient = new DOC.DynamoDB(new AWS.DynamoDB({region: 'ap-southeast-2', endpoint: new AWS.Endpoint("http://localhost:8000")}));
    // docClient.scan(params, function(err, data) {
    //     if (err) console.log(err);
    //     else res.send(data);
    // });

    res.render('index', { title: JSON.stringify(res, null, 2)});
});

module.exports = router;
