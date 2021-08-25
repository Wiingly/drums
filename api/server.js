const express = require('express');
const cors = require('cors')
const wingRouter = require('./wings/router');

const server = express();

server.use(express.json());
server.use(cors())

server.use('/api/wings', wingRouter);

server.get('/api/wings', (req, res) => {
    res.json({ message: 'api up' })
})

server.use('*', (req, res) => { 
    res.send(`<h1>Hello</h1>`)
})

module.exports = server;