const express = require('express');
const cors = require('cors');

const server = express()

const wingRouter = require('./wings/router');

server.use(express.json());
server.use(cors())

server.use('/api/wings', wingRouter);

server.use('/', (req, res, next) => { // eslint-disable-line
    res.status(200).json({ message: `Welcome to the Wingly API!` });
});
  
server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
    });
});

module.exports = server;