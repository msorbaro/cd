/* eslint no-alert: 0 */
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Input } from 'reactstrap';
import firebase from 'firebase';
import logo from '../pictures/calendar.png';
import noUserPic from '../pictures/noUser.png'
import blankPic from '../pictures/nofriend.png'
import { NavLink, withRouter } from 'react-router-dom';
import * as db from './datastore';
import '../cssfolder/fakeprofile.css';
import noFriends from '../pictures/nofriend.png';



class Morgan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: 'no user ID',
      userEmail: 'no email',
      userFirstName: ' first ',
      userLastName: ' last ',
      userFullName: 'username',
      userYear: 'no year',
      friendsIDs: [],
      friendsPics: [],
      friendsNames: [],
      friendsNamesOfficial: [],
      bio: '',
      image: noUserPic,
      newClub: '',
      newClass: '',
      classes: '',
      classList: [],
      clubList: [],
      editing: false,
    };  
    }

    setFriendsNamesAndPics = (Friends) => {

      this.state.friendsPics = []
      this.state.friendsNames = []
  
      for (let i = 0; i < Object.keys(Friends).length; i += 1) {
        const currentKey = Object.keys(Friends)[i];
        const currItem = Friends[currentKey];
       db.getUser(currItem, this.setFriendInfo);
       //console.log(this.state.friendsNames);

      
      }
    }
    setFriendInfo = (user) => {
      var pics = this.state.friendsPics
      var names = this.state.friendsNames
      pics.push(user.userPic);
      names.push(`${user.userFirstName} ${user.userLastName}`);

      this.setState({
        friendsPics: pics,
        friendsNames: names,
      })
    }

    setClassInfo = (classes) => {
      var Class = []
      for (let i = 0; i < Object.keys(classes).length; i += 1) {
        const currentKey = Object.keys(classes)[i];
        const currItem = classes[currentKey];
  
       Class.push(` ${currItem} (${currentKey})`);

       this.setState ({
         classList: Class
       })
    
      }

    }

    setClubsInfo = (clubs) => {
      var ClubList = []
      for (let i = 0; i < Object.keys(clubs).length; i += 1) {
        const currentKey = Object.keys(clubs)[i];
        const currItem = clubs[currentKey];
  
        ClubList.push(currItem);

        this.setState ({
          clubList: ClubList,

        })
    
      }

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

      //IDK why this is here but it works now bc of syncronizatin issues
      db.getFriends(this.state.userID, this.setFriendsNamesAndPics);
      db.getClass(this.state.userID, this.setClassInfo);
      db.getClubs(this.state.userID, this.setClubsInfo);

     
  }
  
 
  onClubChange = (event) => {
    this.setState({ newClub: event.target.value });
  }
  addNewClub = () => {
    
    this.state.clubList.push(this.state.newClub);
    db.addClub(this.state.userID, this.state.newClub);
    this.setState({
        newClub: '',
    });

  }

  onClassChange = (event) => {
    this.setState({ newClass: event.target.value });

  }

  addNewClass = (block) => {
    console.log("new class")
    this.state.classList.push(this.state.newClass);
    db.addClass(this.state.userID, block, this.state.newClass);
    this.setState({
        newClass: '',
    });
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

  follow = () => {
    alert("Request sent!")
  }

  renderClubs = () => {
     if (this.state.clubList.length == 3){
     return (
      <div> 
         <ul> 
             <a href = 'dali'> <li>DALI</li></a>
         </ul>
        </div>
     );
  }
}


    renderClasses = () =>  {
      if (this.state.classList.length == 0){
        return (
      <ul>
        <li> CS 1 TA </li>
        <li> CS 10 TA </li>
        <li> CS 52 TA </li>
        <li> Facebook! </li>
    </ul>
        );
      }
    }

  render() {
    return (
      <div className="all">
        <div className="dartCalLogoProfile">
          DartCal
          <div className="scheduleLogo">
              <a href="calendar" > 
              <img width="80px" src={logo}/>
              </a>
              </div>
        </div>
        <div className="profileinfo">
          <div>
            <h3 className="sectionHeader">Profile</h3>
            <div className="imgStyle">
              <img class="a" src="https://cs.dartmouth.edu/~albertoq/cs10/people/morgan-sorbaro.jpg" width ="250" height="250"/>
            </div>
          </div>
          <div>
          </div>
          <div className="nameContainer">
            <h6>Name</h6>
            <h6>Email</h6>
            <h6>Year</h6>
          </div>
          <div className="inputContainer">
            <div className="indivInput">
              <h6>Morgan Sorbaro</h6>
            </div>
            <div className="indivInput">
              <h6>ms.20@dartmouth.edu</h6>
            </div>
            <div className="indivInput">
              <h6>2020 #SeniorSzn</h6>
            </div>
          </div>
        </div>

        <div className="classinfo">
          <div>
            <h3 className="sectionHeader">Classes</h3>
          </div>
          <div className="listStyle">
           {this.renderClasses()}
          </div>
        </div>

        <div className="clubinfo">
          <div>
            <h3 className="sectionHeader">Clubs</h3>
          </div>
          <div className="listStyle">

          {this.renderClubs()}
                   
          </div>
        </div>

        <div className="friendsinfo">
          <div>
            <h3 className="sectionHeader">Morgan's Friends</h3>
          </div>
          <div class="grid-container">
            <div class="grid-item">
              <div className="imgStyle">
              <img class="a" src={this.state.friendsNames[2]} width="55%" height="35%"/>
              </div>
            </div>
              <div class="grid-item">
              <div className="imgStyle">
                <img class="a" src= "https://images.squarespace-cdn.com/content/v1/551cbdc5e4b0cd11d2597487/1512060367564-IGT0WBWUIVLHVF09B841/ke17ZwdGBToddI8pDm48kEcIqZ-D2i5g-z-Jm45MtO97gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmnhdptcuU1alwky_sWs380ox8UhC6Zi9T53n4b7PpzvcsD7S2cubC6vFsaWXK1aWB/nnY62nCr.jpg?format=1000w" width="45%" height="45%"/>
                <p>Annika Kouhia</p>
              </div>
            </div>
            <div class="grid-item">
              <div className="imgStyle">
                <img class="a" src={this.state.friendsPics[2]} width="55%" height="55%"/>
                <p>{this.state.friendsNames[2]}</p>
              </div>
            </div>  
            <div class="grid-item">
              <div className="imgStyle">
                <img class="a" src={this.state.friendsPics[3]} width="55%" height="55%"/>
                <p>{this.state.friendsNames[3]}</p>
              </div>
            </div>
            <div class="grid-item">
              <div className="imgStyle">
                <img class="a" src={this.state.friendsPics[4]} width="55%" height="55%"/>
                <p>{this.state.friendsNames[4]}</p>
              </div>
            </div>
            <div class="grid-item">
              <div className="imgStyle">
                <img class="a" src={this.state.friendsPics[5]} width="55%" height="55%"/>
                <p>{this.state.friendsNames[5]}</p>
              </div></div> 
          </div>
        </div>
        <div className="editOrFollowButton">
    <Button onClick={this.follow}>Request Morgan as a Friend!</Button> 
        </div>
        <div className="logoutContainer">
          <img width="50px" src="https://cdn3.iconfinder.com/data/icons/mixed-communication-and-ui-pack-1/48/general_pack_NEW_glyph_logout_signout-512.png" style={{ 'vertical-align':'middle', 'mix-blend-mode': 'soft-light'}}/> 
          <NavLink to="/searchfriends">Logout</NavLink>
        </div>
        <div className="calendarContainer">
          <NavLink to="/calendar">
            <img width="50px" src={logo} style={{ 'vertical-align':'middle', 'mix-blend-mode': 'soft-light'}}/>
            Calendar
          </NavLink>
        </div>
      </div>
    );
  }
}



// export default NewPost;
export default withRouter((Morgan));