/* eslint no-alert: 0 */
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Input } from 'reactstrap';
import firebase from 'firebase';
import { NavLink, withRouter } from 'react-router-dom';
import './profileedit.css'

//import './profile.css';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  // automatically called as rendering 
  // component called it automatically as loading 
  // put initialization in here
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

  editProfile = () => {
    this.setState(prevState => ({ showCreateLetterInfo: !prevState.showCreateLetterInfo }));
    if (this.state.showCreateLetterInfo) {
      document.body.style.overflow = 'unset';
    }
  }

  render() {
    const editButton= (
      <div className="editButton">
        <button onClick={this.editProfile}
          type="button"
          className="editButton"
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