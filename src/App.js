
import React, { useState, Fragment } from 'react';
import Navbar from './Components/Layouts/Navbar';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import User from './Components/Users/User';
import Users from './Components/Users/Users';
import Search from './Components/Users/Search';
import Alert from './Components/Layouts/Alert';
import About from './Components/Pages/About';

const App = () => {
  
  const [users,setUsers] = useState([]);
  const [user,setUser] = useState({});
  const [repos,setRepos] = useState([]);
  const [loading,setLoading] = useState(false);
  const [alert,setAlert] = useState(null);
  
  // async componentDidMount() {
  //   this.setState({ loading: true})

  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //   this.setState({ users:res.data, loading: false });
  // }

//search users

 const searchUsers = async (text) => {
    setLoading( true );

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setUsers( res.data.items );
    setLoading( false);
  }

//get user

 const getUser = async (username) =>{
    setLoading( true );

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setUser( res.data );
    setLoading( false);

  }

//get users repo

 const getUserRepos = async (username) =>{
    setLoading( true );

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=50&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setRepos( res.data );
    setLoading( false)

  }

//set alert

  const showAlert = (msg, type) => {
    setAlert({  msg, type});
    setTimeout(() => setAlert( null ), 5000);
  }

//clear function

 const clearUsers = () => {
  setUsers([]);
  setLoading(false);
  }

    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search
                    clearUsers={clearUsers}
                    searchUsers={searchUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={showAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              )} />
              <Route exact path='/about' component={About}/>
              <Route exact path='/user/:login'
               render={props => (
               <User {...props} 
               getUser={getUser} 
               getUserRepos={getUserRepos} 
               user={user} 
               repos={repos}
               loading={loading} 
               />
               )} 
               /> 
            </Switch>
          </div>
        </div>
      </Router>
    );
  

}

export default App;
