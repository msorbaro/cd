import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Switch } from 'react-router';

import '../cssfolder/App.css';


import Signin from './signin';
import Signup from './signup';
import CalendarMonthly from './calendarmonthly';
import Profile from './profile';
import Home from './home';
//import CalendarWeekly from './calendarweekly';
import SearchFriends from './searchfriends';
import ClubProfile from './clubprofile';

//import 'bulma/bulma'

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
            <Route exact path="/clubprofile" component={ClubProfile} />
            <Route component={FallBack} />
           </Switch>

      </div>
    </Router>
  );
}

export default App;
