const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const ifbRoutes = require('./api/routes/ifb');

//app.use(bodyParser);
//app.use(express.bodyParser());

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());


app.use(morgan('dev'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Routes which should handle requests
app.use('/ifb', ifbRoutes);



app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports = app;