var express = require('express');
var router = express.Router();

var AWS = require('aws-sdk'),
    DOC = require("dynamodb-doc");
var docClient = new DOC.DynamoDB(new AWS.DynamoDB({region: 'ap-southeast-2' }));

router.get('/', function(req, res, next) {
    var params = {
        TableName: 'Movies'
    };

    console.log("request", req);
    console.log("resource", res);

    docClient.scan(params, function(err, data) {
        if (err) console.log(err);
        else res.send(data);
    });

});

router.get('/:Title', function(req, res, next) {

    var params = {
        TableName: 'Movies',
        ConsistentRead: true,
        Key: {
            Title: req.params["Title"],
        }
    };

    docClient.get(params, function(err, data) {
        if (err) console.log(err);
        else res.send(data);
    });

});


module.exports = router;
