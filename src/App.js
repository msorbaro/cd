import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Switch } from 'react-router';

import logo from './logo.svg';
import './App.css';


import Signin from './signin';
import Signup from './signup';
import Home from './home';


const FallBack = (props) => {
  return <div>URL Not Found</div>;
};

function App() {
  return (
    <Router>
      <div >
      <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />

            <Route component={FallBack} />
           </Switch>

      </div>
    </Router>
  );
}

export default App;
