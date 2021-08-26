const express = require('express');
const cors = require('cors')
const wingRouter = require('./wings/router');

const server = express();

server.use(express.json());
server.use(cors())

server.use('/api/wings', wingRouter);

server.get('/api/wings', (req, res) => { 
    res.json({ message: '<h1>i hate heroku</h1>' })
})

server.use('*', (req, res) => { 
    res.send('<h1>i hate heroku</h1>')
})

module.exports = server;