/* eslint no-alert: 0 */
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Input } from 'reactstrap';
import firebase from 'firebase';
import logo from '../pictures/calendar.png';
import { NavLink, withRouter } from 'react-router-dom';
import * as db from './datastore';
import '../cssfolder/profile.css';
import getUser from './datastore';


class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: '',
      userFirstName: '',
      userLastName: '',
      userYear: '',
      friendsList: '',
      bio: '',
      image:'',
      clubList: '',
      editing: false,
    };  
  }

  compoundDidMount() {
      db.getUser(this.setCurrUser);
  }

  setCurrUser = (currUser) => {
     this.setState({
        userID: currUser.userID,
        userFirstName: currUser.userFirstName,
        userLastName: currUser.userLastName,
        userYear: currUser.userYear,
      });
  }
  
  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  onPasswordChange= (event) => {
    this.setState({ password: event.target.value });
  }

  onPasswordTwoChange= (event) => {
    this.setState({ passwordTwo: event.target.value });
  }

  onFirstUsernameChange= (event) => {
    this.setState({ firstusername: event.target.value });
  }

  onLastUsernameChange= (event) => {
    this.setState({ lastusername: event.target.value });
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
          <div>
            <h3 className="sectionHeader">Profile</h3>
            <div className="imgStyle">
              <img class="a" src="https://cs.dartmouth.edu/~albertoq/cs10/people/kat-lasonde.png" width="150" height="150"/>
            </div>
          </div>
          <div className="nameContainer">
            <h6>Name</h6>
            <h6>Email</h6>
            <h6>Password</h6>
            <h6>Year</h6>
          </div>
          <div className="inputContainer">
            <div className="indivInput">
              <h6>{this.userFirstName}</h6>
              <h6>Kat Lasonde</h6>
            </div>
            <div className="indivInput">
              <h6>kat.lasonde.23@dartmouth.edu</h6>
            </div>
            <div className="indivInput">
              <h6>***********</h6>
            </div>
            <div className="indivInput">
              <h6>2023</h6>
            </div>
          </div>
        </div>

        <div className="classinfo">
          <div>
            <h3 className="sectionHeader">Classes</h3>
          </div>
          <div className="listStyle">
            <ul>
              <li>COSC10 (10)</li>
              <li>BIOL13 (9L)</li>
              <li>
                <Input className="response" id="emailInputBar" placeholder="ex. ENGL37" onChange={this.onEmailChange} value={this.state.email} />
                <div class="dropdown">
                  <button class="dropbtn">Class Block</button>
                  <div class="dropdown-content">
                    <a href="#">8</a>
                    <a href="#">9S</a>
                    <a href="#">9L</a>
                    <a href="#">10</a>
                    <a href="#">11</a>
                    <a href="#">12</a>
                    <a href="#">2</a>
                    <a href="#">3A</a>
                    <a href="#">6A</a>
                    <a href="#">10A</a>
                    <a href="#">2A</a>
                    <a href="#">3B</a>
                    <a href="#">6B</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="clubinfo">
          <div>
            <h3 className="sectionHeader">Clubs</h3>
          </div>
          <div className="listStyle">
            <ul>
              <li>Dartmouth Formula Racing</li>
              <li>Dali</li>
              <li>
                <Input className="response" id="emailInputBar" placeholder="ex. Tri team" onChange={this.onEmailChange} value={this.state.email} />
              </li>
            </ul>
          </div>
        </div>

        <div className="friendsinfo">
          <div>
            <h3 className="sectionHeader">Friends</h3>
          </div>
          <div class="grid-container">
            <div class="grid-item">
              <div className="imgStyle">
                <img class="a" src="https://cs.dartmouth.edu/~albertoq/cs10/people/lily-maechling.jpg" width="55%" height="55%"/>
                <p>Lily Maechling</p>
              </div>
            </div>
              <div class="grid-item">
              <div className="imgStyle">
                <img class="a" src="https://cs.dartmouth.edu/~albertoq/cs10/people/morgan-sorbaro.jpg" width="55%" height="55%"/>
                <p>Morgan Sorbaro</p>
              </div>
            </div>
            <div class="grid-item">
              <div className="imgStyle">
                <img class="a" src="https://cs.dartmouth.edu/~albertoq/cs10/people/scott-gibbons.jpg" width="55%" height="55%"/>
                <p>Scott Gibbons</p>
              </div>
            </div>  
            <div class="grid-item">
              <div className="imgStyle">
                <img class="a" src="https://cs.dartmouth.edu/~albertoq/cs10/people/dylan-bienstock.jpg" width="55%" height="55%"/>
                <p>Dylan Bienstock</p>
              </div>
            </div>
            <div class="grid-item">
              <div className="imgStyle">
                <img class="a" src="https://images.squarespace-cdn.com/content/v1/551cbdc5e4b0cd11d2597487/1512060367564-IGT0WBWUIVLHVF09B841/ke17ZwdGBToddI8pDm48kEcIqZ-D2i5g-z-Jm45MtO97gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmnhdptcuU1alwky_sWs380ox8UhC6Zi9T53n4b7PpzvcsD7S2cubC6vFsaWXK1aWB/nnY62nCr.jpg?format=1000w" width="55%" height="55%"/>
                <p>Annika Khouia</p>
              </div>
            </div>
            <div class="grid-item">
              <div className="imgStyle">
                <img class="a" src="https://images.squarespace-cdn.com/content/v1/551cbdc5e4b0cd11d2597487/1587482989796-0S8Z5DVKV8Z3SE96M7O9/ke17ZwdGBToddI8pDm48kG-Ms6Smr4lC2kzD5v_KP3t7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTm1v6GcKqh6mrhfxzW2tqo7-0XwA3F-pA8XrOvc9dyMzi0uf8JEqNBbhhFGdpXdvkc/pk2Qpyc.jpg?format=1000w" width="55%" height="55%"/>
                <p>Varsha Iyer</p>
              </div></div>   
          </div>
        </div>
      </div>
    );
  }
}

// export default NewPost;
export default withRouter((Profile));