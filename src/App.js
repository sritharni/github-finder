
import React, { Component, Fragment } from 'react';
import Navbar from './Components/Layouts/Navbar';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import User from './Components/Users/User';
import Users from './Components/Users/Users';
import Search from './Components/Users/Search';
import Alert from './Components/Layouts/Alert';
import About from './Components/Pages/About';

class App extends Component {
  state = {
    users: [],
    repos:[],
    loading: false,
    alert: null,
    user:{}
  }
  // async componentDidMount() {
  //   this.setState({ loading: true})

  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //   this.setState({ users:res.data, loading: false });
  // }

//search users

  searchUsers = async (text) => {
    this.setState({ loading: true })

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ users: res.data.items, loading: false });
  }

//get user

  getUser = async (username) =>{
    this.setState({ loading: true })

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ user: res.data, loading: false });
  }

//get users repo

  getUserRepos = async (username) =>{
    this.setState({ loading: true })

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=50&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ repos: res.data, loading: false });
  }

//set alert

  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } });
    setTimeout(() => this.setState({ alert: null }), 5000);
  }

//clear function

  clearUsers = () => this.setState({ users: [], loading: false })

  render() {
    // const name = "Tharni";
    // const loading = false;
    // const showName = false;
    console.log(this.state.repos)
    return (
      <Router>
        <div className="App">
          {/* {loading ? <h1>loading...</h1> : <h1> Hello {showName && name} </h1>} */}
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search
                    clearUsers={this.clearUsers}
                    searchUsers={this.searchUsers}
                    showClear={this.state.users.length > 0 ? true : false}
                    setAlert={this.setAlert}
                  />
                  <Users loading={this.state.loading} users={this.state.users} />
                </Fragment>
              )} />
              <Route exact path='/about' component={About}/>
              <Route exact path='/user/:login'
               render={props => (
               <User {...props} 
               getUser={this.getUser} 
               getUserRepos={this.getUserRepos} 
               user={this.state.user} 
               repos={this.state.repos}
               loading={this.state.loading} 
               />
               )} 
               /> 
            </Switch>
          </div>
        </div>
      </Router>
    );
  }

}

export default App;
