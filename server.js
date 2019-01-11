const express = require('express');
const configMiddleware = require('./config/middleware');

const server = express();

const projectsDb = require('./data/helpers/projectModel');
const actionsDb = require('./data/helpers/actionModel');

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
});

// get project actions by project ID
server.get('/api/projects/:id/actions', async (req, res) => {
    const { id } = req.params;

    try {
        const actions = await projectsDb.getProjectActions(id);
        if (actions) {
            res.status(200).json(actions);
        } else {
            res.status(404).json({
                message: 'Sorry, the project with this ID could not be found.'
            })
        }
    } catch (err) {
        errorHelper(res, err);
    }
});

// add project
server.post('/api/projects', async (req, res) => {
    const { body } = req;
    
    try {
        const newProject = await projectsDb.insert(body);
        res.status(201).json(newProject);
    } catch (err) {
        errorHelper(res, err);
    }
});

// edit project
server.put('/api/projects/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const editedProject = await projectsDb.update(id, body);
        if (editedProject) {
            res.status(201).json(editedProject);
        } else {
            res.status(404).json({
                message: 'Sorry, the project with this ID could not be found.'
            });
        }
    } catch (err) {
        errorHelper(res, err);
    }
});

// delete post by post ID
server.delete('/api/projects/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProject = await projectsDb.remove(id);
        res.status(201).json(deletedProject);
    } catch (err) {
        errorHelper(res, err);
    }
});

// get all actions
server.get('/api/actions', async (req, res) => {
    try {
        const actions = await actionsDb.get();
        res.status(200).json(actions);
    } catch (err) {
        errorHelper(res, err);
    }
});

// get action by action ID
server.get('/api/actions/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const action = await actionsDb.get(id);
        if (action) {
            res.status(200).json(action);
        } else {
            res.status(404).json({
                message: 'The action with this ID could not be found.'
            });
        }
    } catch (err) {
        errorHelper(res, err);
    }
});

// create new action
server.post('/api/actions', async (req, res) => {
    const { body } = req;

    try {
        const newAction = await actionsDb.insert(body);
        res.status(201).json(newAction);
    } catch (err) {
        errorHelper(res, err);
    }
});

module.exports = server;