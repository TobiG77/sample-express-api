var express = require('express');
var router = express.Router();

var AWS = require('aws-sdk'),
    DOC = require('dynamodb-doc');
var docClient =new AWS.DynamoDB.DocumentClient({region: 'ap-southeast-2' });

router.get('/', function(req, res, next) {

    var params = {
        TableName: 'Movies'
    };

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


router.put('/:Title', function(req, res, next) {

    var params = {
        TableName: 'Movies',
        Item: req.body
    }

    docClient.put(params, function(err, data) {
        if (err) console.log(err);
        else res.send(data);
    });

});


module.exports = router;
