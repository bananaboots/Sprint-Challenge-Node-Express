import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const ProjectCard = styled.div`
    border: 1px solid gray;
    padding: 1rem;
`

export default class Projects extends Component {
    constructor() {
        super();
        this.state = {
            projects: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/projects')
            .then(({ data }) => this.setState({
                projects: data
            }))
            .catch(console.log);
    }

    render() {
        return (
            <Fragment>
                <Link to = '/newproject'>Create a new project</Link>
                {(this.state.projects.length) &&
                (this.state.projects.map(project => (
                    <ProjectCard 
                        key = {project.id} 
                        onClick = {() => this.props.history.push(`/projects/${project.id}`)}
                    >
                        <p>name: {project.name}</p>
                        <p>description: {project.description}</p>
                        <p>completed: {project.completed.toString()}</p>
                    </ProjectCard>
                )))}
            </Fragment>
        );
    }
}