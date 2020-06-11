/* eslint no-alert: 0 */
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Input } from 'reactstrap';
import firebase from 'firebase';
import logo from '../pictures/DartCalLogo.png';
import background from '../pictures/splashBackground.png';
import { NavLink, withRouter } from 'react-router-dom';
import * as db from './datastore';
import '../cssfolder/splashpage.css';




class SplashPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: 'no user ID',
      userEmail: 'no email',
      userFirstName: ' first ',
      userLastName: ' last ',
      userFullName: 'username',
      userYear: 'no year',
    };  
    }

  
  componentDidMount() {
    db.getCurrUser(this.setCurrUser);
  }

 
  setCurrUser = (currUser) => {
     this.setState({
        userID: currUser.userID,
        userEmail: currUser.userEmail,
        userFirstName: currUser.userFirstName,
        userLastName: currUser.userLastName,
        userYear: currUser.userYear,
        image: currUser.userPic,
      });
  }
  

  render() {
    return (
      <div className="allSignIn" >
        <div className="navBar">
            <div className="dartCalLogoNav">
                DartCal
                <img width="45px" src={logo} style={{'margin-left':'5%', verticalAlign: 'text-top'}}/>
            </div>
            <div style={{position:'fixed', left:'75%', top:'1%', width: '25%'}}>
                <NavLink to="/signin" ><Button id="nav" style={{'margin-right':'5%'}}>Log In</Button></NavLink>
                <NavLink to="/signup" ><Button id="nav" style={{'background-color': '#5C9900'}}>Sign Up</Button></NavLink>
            </div>
        </div>
        <div>
            <img src={background} style={{width:'1200px'}}/>
        </div>
      </div>
    );
  }
}


export default withRouter((SplashPage));