import React, { Component } from 'react';
import axios from 'axios';

export default class EditProject extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            description: '',
            completed: ''
        }
    }

    changeHandler = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    submitHandler = e => {
        const completedBoolean = (this.state.completed === "true") ? true : false;
        e.preventDefault();
        axios.put(`http://localhost:5000/api/projects/${this.props.match.params.id}`, {
            "name": this.state.name,
            "description": this.state.description,
            "completed": completedBoolean
        })
            .then(() => {
                this.setState({
                    name: '',
                    description: ''
                }, () => this.props.history.push('/projects'));
            })
            .catch(console.log)
    }

    render() {
        return (
            <form onSubmit = {this.submitHandler}>
                <input 
                    name = 'name'
                    type = 'text'
                    value = {this.state.name}
                    placeholder = 'Name'
                    onChange = {this.changeHandler}
                />
                <input
                    name = 'description'
                    type = 'text'
                    value = {this.state.description}
                    placeholder = 'Description'
                    onChange = {this.changeHandler}
                />
                <input
                    name = 'completed'
                    type = 'text'
                    value = {this.state.completed}
                    placeholder = 'false'
                    onChange = {this.changeHandler}
                />
                <button type = 'submit'>Submit</button>
            </form>
        );
    }
}