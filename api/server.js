const express = require('express');
const cors = require('cors')
const wingRouter = require('./wings/router');

const server = express();

server.use(express.json());
server.use(cors())

server.use('/api/wings', wingRouter);

server.use('*', (req, res) => { 
    res.json({ api: 'up' })
})

module.exports = server;