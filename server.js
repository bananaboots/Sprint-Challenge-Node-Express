const express = require('express');
const configMiddleware = require('./config/middleware');

const server = express();

const projectsDb = require('./data/helpers/projectModel');

configMiddleware(server);

const errorHelper = (res, err) => {
    res.status(500).json({
        message: 'There was an error while processing your request.',
        error: err
    })
}

// get all projects
server.get('/api/projects', async (req, res) => {
    try {
        const projects = await projectsDb.get();
        res.status(200).json(projects);
    } catch (err) {
        errorHelper(res, err)
    }
});

module.exports = server;