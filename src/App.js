import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import NavBar from './NavBar';
import ProjectsHolder from './components/ProjectsHolder'
import './App.css';

class App extends Component{
  render() {
    return (
      <>
        <Router>
            <NavBar />
            <ProjectsHolder />
        </Router>    
      </>
    );
  }
}

export default App;
