import React, { Component } from 'react';
import axios from 'axios';

export default class NewProject extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            description: ''
        }
    }

    changeHandler = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    submitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/projects', {
            "name": this.state.name,
            "description": this.state.description,
            "completed": false
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
                <button type = 'submit'>Submit</button>
            </form>
        );
    }
}