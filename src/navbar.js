import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import firebase from 'firebase';
import '../style.scss';

class NavBar extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        authenticated: false,
      };
    }

}

export default withRouter((NavBar));