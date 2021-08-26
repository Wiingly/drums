require('dotenv').config()
const express = require('express');
const cors = require('cors')
const wingRouter = require('./api/wings/router');

const server = express();
const PORT = process.env.PORT || 5000;

server.use(express.json());
server.use(cors())

server.use('/api/wings', wingRouter);

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });

module.exports = server;


