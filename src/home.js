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
        authenticated: false,
      }
      };
    


render() {
    return ( 
      <div >
      <li id="signup"><NavLink to="/signup" ><Button >Sign Up</Button></NavLink></li>
      <li id="signin"><NavLink to="/signin" ><Button >Sign In</Button></NavLink></li>
    </div>
    );
}

}
export default withRouter((Home));