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
        errorHelper(res, err);
    }
});

// get project by project ID
server.get('/api/projects/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const project = await projectsDb.get(id);
        res.status(200).json(project);
    } catch (err) {
        errorHelper(res, err);
    }
})

module.exports = server;