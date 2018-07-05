const express = require('express');
const router = express.Router();




var AWS = require("aws-sdk");
AWS.config.update({
    region: "us-east-1"
  });

var docClient = new AWS.DynamoDB.DocumentClient();
var table = "opwbids";
// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});


router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});

router.get('/dbTables', (req, res, next) => {
      console.log("entered into dynadb route - list tables");
      ddb.listTables({Limit: 10}, function(err, data) {
            if (err) {
                console.log("Error", err.code);
            } else {
                console.log("Table names are ", data.TableNames);
                res.status(200).json({
                 TableNames: data.TableNames
                    });
            }
      });
});

router.post('/addbid', (req, res, next) => {
    var requestdata = req.body;
    var params = {
        TableName:table,
        Item: requestdata
    }
    console.log('Before' + params.Item);
    docClient.put(params, function(err, data) {
        console.log('inside put action' + err);
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(201).json(JSON.stringify(data, null, 2));
        }
    });
});

router.get('/:bidId', (req, res, next) => {
    console.log("fetching item...");
    const id = req.params.bidId;
    console.log("fetching item..." + id);
    var params = {
        TableName:table,
        Key:{
            "bidid": id
        }
    }   
    docClient.get(params, function(err, data) {
        if (err) {
            res.status(404).json(JSON.stringify(err, null, 2));
        } else {
            res.status(200).json(JSON.stringify(data, null, 2));
            console.log(' data created -- ' + JSON.stringify(data));
        }
    });

});

router.patch('bidId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product!'
    });
});

router.delete('bidId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted product!'
    });
});

module.exports = router;