import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import NavBar from './NavBar';
import ProjectsHolder from './components/ProjectsHolder';
import ShowCase from './components/ShowCase';
import './App.css';

class App extends Component{
  render() {
    return (
      <>
        <Router>
            <NavBar />
            <div className="page-body">
              <Switch>
                <Route path="/" component={ProjectsHolder} exact />
                <Route path="/showcase/:name" component={ShowCase} />
              </Switch>
            </div>
        </Router>    
      </>
    );
  }
}

export default App;
