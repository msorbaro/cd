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
   // db.addFriend("OdJjai41HnNQzn9eGOzDuFgas6D2", "r48jVmIbLGas73K1f28Jh9eiUku2");
    //db.addFriend("OdJjai41HnNQzn9eGOzDuFgas6D2", "yvKgKo5tmNXtKbIVtL6k6bYcQ6X2");
      

   // db.addClass("MLhz9Wxx8agGaTfqSkL6znb1Obu2", "9L", "BIO10");
   // db.addClass("MLhz9Wxx8agGaTfqSkL6znb1Obu2", "12", "CS50");

  // db.addClub("1Jjz8wFtvcNozAm1V6Fs3HwGRJX2", "Dali");
   //db.addClub("1Jjz8wFtvcNozAm1V6Fs3HwGRJX2", "DFR");
  // db.addClub("1Jjz8wFtvcNozAm1V6Fs3HwGRJX2", "Pong");
      
      
      }
    
  logOut = () => {

    db.signOut();
  }
  

render() {
    return ( 
      <div >
    <NavLink to="/signup" ><Button >Sign Up</Button></NavLink>
    <NavLink to="/" ><Button >Sign In</Button></NavLink>
    <NavLink to="/calendar" ><Button >Calendar</Button></NavLink>
    <NavLink to="/profile" ><Button>View your profile</Button></NavLink>
    <NavLink to="/searchfriends" ><Button>Search for your friends!</Button></NavLink>
    <NavLink to="/clubprofile" ><Button>View club profile</Button></NavLink>
    <Button onClick={this.addID}>add friends</Button>
    <NavLink to="/" ><Button onClick={this.logOut} >Sign off</Button></NavLink>
    <NavLink to="/friendprofile" ><Button onClick={this.logOut} >Friend Profile</Button></NavLink>
   

    </div>
    );
}

}
export default withRouter((Home));