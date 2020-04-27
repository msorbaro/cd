/* eslint no-alert: 0 */
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Input } from 'reactstrap';
import firebase from 'firebase';
import logo from './calendar.png';
import { NavLink, withRouter } from 'react-router-dom';

//import './profile.css';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  handleCancelButtonClick = (event) => {
    this.props.history.push('/');
  }

  render() {
    return (
    <div >
      <p>profile edit page</p> 
    </div>

    );
  }
}

// export default NewPost;
export default withRouter((ProfileEdit));