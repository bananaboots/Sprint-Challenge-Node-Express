import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ProjectCard = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid gray;
    padding: 1rem;
`

const EditDelete = styled.div`
    align-self: flex-end;
    font-size: .75rem;
`

export default class Projects extends Component {
    constructor() {
        super();
        this.state = {
            project: {}
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/api/projects/${this.props.match.params.id}`)
            .then(({ data }) => this.setState({
                project: data
            }))
            .catch(console.log);
    }

    edit = () => this.props.history.push(`/projects/${this.props.match.params.id}/edit`);

    delete = () => {
        axios.delete(`http://localhost:5000/api/projects/${this.props.match.params.id}`)
            .then(() => this.props.history.push('/projects'))
            .catch(console.log);
    }

    render() {
        return (
            <ProjectCard>
                <EditDelete>
                    <span onClick = {this.edit}>Edit</span><br/>
                    <span onClick = {this.delete}>Delete</span>
                </EditDelete>
                <span>name:
                    <p>{this.state.project.name}</p>
                </span>
                <span>description:
                    <p>{this.state.project.description}</p>
                </span>
                {(this.state.project.name) && 
                (<span>completed: 
                    <p>{this.state.project.completed.toString()}</p>
                </span>)}
                <span>actions: 
                {(this.state.project.actions && this.state.project.actions.length) ? 
                (this.state.project.actions.map(action => (
                    <p key = {action.id}>description: {action.description}<br/>
                    notes: {action.notes}<br/>
                    completed: {action.completed.toString()}</p>
                ))) : (<p>N/A</p>)}</span>
            </ProjectCard>
        );
    }
}