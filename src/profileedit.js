/* eslint no-alert: 0 */
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Input } from 'reactstrap';
import firebase from 'firebase';
import logo from './calendar.png';
import { NavLink, withRouter } from 'react-router-dom';
import './profileedit.css'

//import './profile.css';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  // 
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ userID: user.uid });
        this.setState({ username: user.displayName });
      }
    });
  }

  handleCancelButtonClick = (event) => {
    this.props.history.push('/');
  }

  render() {
    const createButton = (
      <div className="createLetterButtonContainer">
        <button onClick={this.createQuestion}
          type="button"
          className="pollButton"
        >
        </button>
      </div>
    );

    return (
    <div >
      <p>profile edit page</p> 
    </div>
    //<div style= {createButton}> </div>
    );
  }
}

// export default NewPost;
export default withRouter((ProfileEdit));