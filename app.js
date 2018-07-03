const express = require('express');
const app = express();
const morgan = require('morgan');

const ifbRoutes = require('./api/routes/ifb');

app.use(morgan('dev'));

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