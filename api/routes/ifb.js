const express = require('express');
const router = express.Router();

var AWS = require("aws-sdk");
AWS.config.update({
    region: "us-east-1"
  });

var docClient = new AWS.DynamoDB.DocumentClient();
var table = "opwbids";



/*router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});*/

router.post('/addbid', (req, res, next) => {
    var bidid = "1";
    var params = {
        TableName:table,
        Item:{
            "bidid": bidid,
            "Client":{
                "Name": "The Client Company Inc.",
                "Sites": ["205, Arbor Oaks Summerville", "200, Arbor Oaks Summerville"]
            },
            "BidDueDate": "07/03/2018",
            "WorkDueDate": "10/03/2018",
            "Description": "Installs pipes and fixtures, such as sinks and toilets, for water, gas, steam, air, or other liquids Installs supports for pipes, equipment, and fixtures prior to installation Assembles fittings and valves for installation Modifies length of pipes, fixtures, and other plumbing materials as needed for a building Uses saws and pipe cutters as necessary Installs heating and air-conditioning systems, including water heaters Collaborates with contractors, construction workers, electricians, pipefitters, and steamfitters in installing and repairing plumbing Tests plumbing systems for leaks and other problems Analyses problem and identifies appropriate tools and materials for repair Chooses plumbing materials based on budget, location, and intended uses of building Follows health and safety standards and complies with building codes Writes report documenting the problem and summary of actions taken Performs inspections of plumbing systems to identify and replace worn parts Prepares bids and schedules and oversees other workers, such as apprentices and helpers",
            "Documents":[
                {
                    "Name": "ABC.doc",
                    "URL": "https://ABC.doc"
                },
                {
                    "Name": "XYZ.doc",
                    "URL": "https://XYZ.doc"
                }
            ],
            "Vendors":[
                {
                    "Name": "Vendor 1",
                    "Type": "Alarms",
                    "Status": "Open/Closed/Waiting",
                    "Price": "1000",
                    "Comments":[
                        {
                            "question": "Value?",
                            "reply": "Ans"
                        },
                        {
                            "question": "Value?",
                            "reply": "Ans"
                        }
                    ],

                    "BidPackage":[
                        {
                            "Name": "ABC.doc",
                            "URL": "https://ABC.doc"
                        },
                        {
                            "Name": "XYZ.doc",
                            "URL": "https://XYZ.doc"
                        }
                    ]
                },
                {
                    "Name": "Vendor 1",
                    "Type": "Alarms",
                    "Status": "Open/Closed/Waiting",
                    "Price": "1000",
                    "Comments":[
                        {
                            "question": "Value?",
                            "reply": "Ans"
                        },
                        {
                            "question": "Value?",
                            "reply": "Ans"
                        }
                    ],

                    "BidPackage":[
                        {
                            "Name": "ABC.doc",
                            "URL": "https://ABC.doc"
                        },
                        {
                            "Name": "XYZ.doc",
                            "URL": "https://XYZ.doc"
                        }
                    ]
                }
            ]
        }
    };
    console.log("Adding a new item...");
    docClient.put(params, function(err, data) {
        if (err) {
            res.status(500).json(JSON.stringify(err, null, 2));
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