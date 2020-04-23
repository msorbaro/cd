import React from 'react';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import NavBar from './navbar'
import Signin from './Signin'
import Signup from './Signup'


const MainMenu = () => {
  <div>
    <Link to="/">
      <button>home</button>
    </Link>
  </div>
}

const Home = () => (
  <div>
    Home
  </div>
)

function App() {
  return (
    <Router>
      <div >
        <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/" component={Home} />

            <Route component={FallBack} />
          
          
      </Switch>
      </div>
    </Router>
  );
}

export default App;
