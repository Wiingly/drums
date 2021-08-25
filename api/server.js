const express = require('express');
const wingRouter = require('./wings/router');

const server = express();

server.use(express.json());
server.use('/api/wings', wingRouter);

module.exports = server;