import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Input } from 'reactstrap';
import firebase from 'firebase';
import { NavLink, withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as db from './datastore';



class Home extends Component {
    
    constructor(props) {
      super();
      this.state = {
        authenticated: false, }
      };
addID =() => {
    //b.addFriend("qWMU14UjmHNdFWAGGXucS1eqZHj2", "r48jVmIbLGas73K1f28Jh9eiUku2");
    //db.addFriend("qWMU14UjmHNdFWAGGXucS1eqZHj2", "yvKgKo5tmNXtKbIVtL6k6bYcQ6X2");
      

    //db.addClass("qWMU14UjmHNdFWAGGXucS1eqZHj2", "9L", "BIO10");
    //db.addClass("qWMU14UjmHNdFWAGGXucS1eqZHj2", "12", "CS50");

    //db.addClub("qWMU14UjmHNdFWAGGXucS1eqZHj2", "Dali");
    //db.addClub("qWMU14UjmHNdFWAGGXucS1eqZHj2", "DFR");
    //db.addClub("qWMU14UjmHNdFWAGGXucS1eqZHj2", "Pong");
      
      
      }

render() {
    return ( 
      <div >
    <NavLink to="/signup" ><Button >Sign Up</Button></NavLink>
    <NavLink to="/signin" ><Button >Sign In</Button></NavLink>
    <NavLink to="/calendarweekly" ><Button >Calendar</Button></NavLink>
    <NavLink to="/profile" ><Button>View your profile</Button></NavLink>
    <NavLink to="/searchfriends" ><Button>Search for your friends!</Button></NavLink>
    <NavLink to="/clubprofile" ><Button>View club profile</Button></NavLink>
    <Button onClick={this.addID}>add friends</Button>
    </div>
    );
}

}
export default withRouter((Home));