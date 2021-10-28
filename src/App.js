
import React, { Fragment } from 'react';
import Navbar from './Components/Layouts/Navbar';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import User from './Components/Users/User';
import Alert from './Components/Layouts/Alert';
import About from './Components/Pages/About';
import GithubState from './Context/github/GithubState';
import AlertState from './Context/alert/AlertState';
import { Home } from './Components/Pages/Home';
import { NotFound } from './Components/Pages/NotFound';

const App = () => {
  
    return (
      <GithubState>
        <AlertState>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About}/>
              <Route exact path='/user/:login' component={User}/> 
              <Route component={NotFound}/>
            </Switch>
          </div>
        </div>
      </Router>
      </AlertState>
      </GithubState>
    );
  

}

export default App;
