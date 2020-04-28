/* eslint no-alert: 0 */
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Input } from 'reactstrap';
import firebase from 'firebase';
import logo from './calendar.png';
import { NavLink, withRouter } from 'react-router-dom';
import './profileview.css';

class ProfileView extends Component {
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
      <div className="all">
        <div className="dartCalLogoProfile">
          DartCal
          <div className="scheduleLogo"><img width="80px" src={logo}/></div>
        </div>
        <div className="profileinfo">
          <div className="inputline">
            <h3 className="sectionHeader">Profile</h3>
            <img src="https://cs.dartmouth.edu/~albertoq/cs10/people/kat-lasonde.png" width="150" height="150"/>
          </div>
          <div className="inputline">
            Name: 
            <Input className="response" id="emailInputBar" placeholder="Dartmouth Email" onChange={this.onEmailChange} value={this.state.email} />
          </div>
          <div className="inputline">
            Email: 
            <Input type="password" className="response" id="passwordInput" placeholder="william.s.gibbons.23@dartmouth.edu" onChange={this.onPasswordChange} value={this.state.password} />
          </div>
          <div className="inputline">
            Password: 
            <Input type="password" className="response" id="passwordInput" placeholder="Password" onChange={this.onPasswordChange} value={this.state.password} />
          </div>
          <div className="inputline">
            Year: 
            <Input type="password" className="response" id="passwordInput" placeholder="2023" onChange={this.onPasswordChange} value={this.state.password} />
          </div>
        </div>
        
      </div>
    );
  }
}

// export default NewPost;
export default withRouter((ProfileView));