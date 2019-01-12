import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Home from './components/Home';
import Projects from './components/Projects';
import NewProject from './components/NewProject';
import Project from './components/Project';
import EditProject from './components/EditProject';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path = "/" component = {Home} />
        <Route exact path = "/projects" component = {Projects} />
        <Route exact path = "/newproject" component = {NewProject} />
        <Route exact path = "/projects/:id" component = {Project} />
        <Route exact path = "/projects/:id/edit" component = {EditProject} />
      </div>
    );
  }
}

export default App;
