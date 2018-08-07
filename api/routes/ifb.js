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
    console.log('Before' + JSON.stringify(params.Item));
    docClient.put(params, function(err, data) {
        console.log('inside put action' + data);
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
            res.status(200).json(JSON.stringify(data.Item, null, 2));
            console.log(' data created -- ' + JSON.stringify(data));
        }
    });

});


router.get('/all/:userid', (req, res, next) => {
    const id = req.params.userid;
    var params = {
        TableName:table,
        IndexName: "userid-index",
        KeyConditionExpression: "userid = :user",
        ExpressionAttributeValues: {
        ":user": id
        }
    }   
 
    docClient.query(params, function(err, data) {
        if (err) {
            res.status(404).json(JSON.stringify(err, null, 2));
        } else {
            res.status(200).json(JSON.stringify(data.Items, null, 2));
        }
    });

});

router.patch('/update', (req, res, next) => {
   console.log("Updating item####")
   const id = req.params.bidId;
   console.log("fetching item..." + id);

   var params = {
       TableName: table,
       Key: {
           "bidid": "2"
       },

       UpdateExpression: "set Price = :d ",
		ExpressionAttributeValues:{
			":d":"5000",
		},
   ReturnValues:"UPDATED_NEW"
       
   }
   docClient.update(params, function (err, data) {

       if (data) {

           res.status(200).json(JSON.stringify(data, null));
           message: 'Updated product!'
           console.log(' data Updated -- ' + JSON.stringify(data));

       }
       else {
         
           res.status(500).json(JSON.stringify(err, null));
       }
   });
});

router.delete('/Delete', (req, res, next) => {
   console.log("Deleting item####")
   const id = req.params.bidId;
   console.log("fetching item..." + id);

   var params = {
       TableName: table,
       Key: {
           "bidid": id
       }
   }
   docClient.delete(params, function (err, data) {

       if (data) {

           res.status(200).json(JSON.stringify(data, null));
           message: 'Updated product!'
           console.log(' data Updated -- ' + JSON.stringify(data));

       }
       else {
           res.status(400).json(JSON.stringify(err, null));
           res.status(404).json(JSON.stringify(err, null));
           res.status(500).json(JSON.stringify(err, null));
       }
   });
});

module.exports = router;