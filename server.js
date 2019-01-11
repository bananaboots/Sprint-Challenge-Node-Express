const express = require('express');
const configMiddleware = require('./config/middleware');

const server = express();

configMiddleware(server);

server.get('/', (req, res) => {
    res.status(200).send('hello');
});

module.exports = server;