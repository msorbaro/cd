import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Input } from 'reactstrap';
import firebase from 'firebase';

class Home extends Component {
    
    constructor(props) {
      super();
      this.state = {
        authenticated: false,
      }
      };
    


render() {
    return ( 
        <div></div>
    );
}

}
export default withRouter((Home));