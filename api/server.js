const express = require('express');
const wingRouter = require('./wings/router');

const server = express();

server.use(express.json());

server.use('/api/wings', wingRouter);

server.use('*', (req, res) => { 
    res.json({ api: 'up' })
  })

module.exports = server;