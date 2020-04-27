import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Switch } from 'react-router';

import logo from './logo.svg';
import './App.css';


import Signin from './signin';
import Signup from './signup';
import CalendarMonthly from './calendarmonthly';
import Profile from './profile';
import Home from './home';
import CalendarWeekly from './calendarweekly';
import SearchFriends from './searchfriends';



const FallBack = (props) => {
  return <div>URL Not Found</div>;
};

function App() {
  return (
    <Router>
      <div >
      <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/calendarmonthly" component={CalendarMonthly} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/searchfriends" component={SearchFriends} />
            <Route exact path="/calendarweekly" component={CalendarWeekly} />
            <Route component={FallBack} />
           </Switch>

      </div>
    </Router>
  );
}

export default App;
