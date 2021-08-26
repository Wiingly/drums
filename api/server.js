const express = require('express');
const cors = require('cors')
const helmet = require('helmet')

const wingRouter = require('./wings/router');

const server = express()

server.use(express.json());
server.use(cors())
server.use(helmet())

server.use('/api/wings', wingRouter);

module.exports = server;