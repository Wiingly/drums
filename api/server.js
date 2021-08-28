const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const server = express()

const wingRouter = require('./wings/router');
const usersRouter = require('./users/router');
const authRouter = require('./auth/auth-router.js');

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/wings', wingRouter);
server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter);


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