import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Input } from 'reactstrap';
import firebase from 'firebase';
import { NavLink, withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


class Home extends Component {
    
    constructor(props) {
      super();
      this.state = {
        authenticated: false, }
      };

render() {
    return ( 
      <div >
    <NavLink to="/signup" ><Button >Sign Up</Button></NavLink>
    <NavLink to="/signin" ><Button >Sign In</Button></NavLink>
    <NavLink to="/calendarmonthly"><Button >Monthly calendar</Button></NavLink>
    <NavLink to="/calendarweekly" ><Button >Weekly calendar</Button></NavLink>
    <NavLink to="/profile" ><Button>View your profile</Button></NavLink>
    <NavLink to="/searchfriends" ><Button>Search for your friends!</Button></NavLink>
    <NavLink to="/clubprofile" ><Button>View club profile</Button></NavLink>
    </div>
    );
}

}
export default withRouter((Home));