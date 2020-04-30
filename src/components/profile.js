/* eslint no-alert: 0 */
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Input } from 'reactstrap';
import firebase from 'firebase';
import logo from '../pictures/calendar.png';
import noUserPic from '../pictures/noUser.png'
import { NavLink, withRouter } from 'react-router-dom';
import * as db from './datastore';
import '../cssfolder/profile.css';
import getUser from './datastore';
import noFriends from '../pictures/nofriend.png';



class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: 'no user ID',
      userEmail: 'no email',
      userFirstName: ' first ',
      userLastName: ' last ',
      userName: 'username',
      userYear: 'no year',
      friendsPics: [noUserPic, noUserPic, noUserPic, noUserPic, noUserPic, noUserPic],
      friendsNames: ['', '', '', '', '', ''],
      bio: '',
      image: '',
      classList: [],
      clubList: [],
      editing: false,
    };  
  }

  assignFriendsNamesAndPics = () => {
    const f = db.getFriends(this.state.userID);
    //index = 0;
  
   

   // Object.keys(f).map((id) => {
      //  this.state.friendsPics[index] = db.getImage(f[id]);
       // this.setState.friendsNames[index] = db.getName(f[id]);   
    //  })
    }

  componentDidMount() {
    
      db.getCurrUser(this.setCurrUser);
      this.assignFriendsNamesAndPics();
      this.state.classList = db.getClass(this.state.userID);
      this.state.clubList = db.getClubs(this.state.userID);
      
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
              <img class="a" src={this.state.image} width="150" height="150"/>
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
              <h6>{this.state.userFirstName}</h6>
            </div>
            <div className="indivInput">
              <h6>{this.state.userEmail}</h6>
            </div>
            <div className="indivInput">
              <h6>***********</h6>
            </div>
            <div className="indivInput">
              <h6>{this.state.userYear}</h6>
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
                <img class="a" src={this.state.friendsPics[0]} width="55%" height="55%"/>
                <p>Lily Maechling</p>
              </div>
            </div>
              <div class="grid-item">
              <div className="imgStyle">
                <img class="a" src={this.state.friendsPics[1]} width="55%" height="55%"/>
                <p>Morgan Sorbaro</p>
              </div>
            </div>
            <div class="grid-item">
              <div className="imgStyle">
                <img class="a" src={this.state.friendsPics[2]} width="55%" height="55%"/>
                <p>Scott Gibbons</p>
              </div>
            </div>  
            <div class="grid-item">
              <div className="imgStyle">
                <img class="a" src={this.state.friendsPics[3]} width="55%" height="55%"/>
                <p>Dylan Bienstock</p>
              </div>
            </div>
            <div class="grid-item">
              <div className="imgStyle">
                <img class="a" src={this.state.friendsPics[4]} width="55%" height="55%"/>
                <p>Annika Khouia</p>
              </div>
            </div>
            <div class="grid-item">
              <div className="imgStyle">
                <img class="a" src={this.state.friendsPics[5]} width="55%" height="55%"/>
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