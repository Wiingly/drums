require('dotenv').config()

const express = require('express');
const path = require('path');

const server = require('./api/server');

const port = process.env.PORT;

server.use(express.static(path.join(__dirname, 'client/dist')))

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'))
})

server.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});


