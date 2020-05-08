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
import '../cssfolder/profile.css';
import noFriends from '../pictures/nofriend.png';



class FriendProfile extends Component {
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

  renderClubs = () => {
    if (this.state.clubList.length == 0){
      return (
        <div> 
           {`${this.state.userFirstName}`} doesn't follow any clubs!
          </div>
       );
    }

    else if (this.state.clubList.length == 1){
      return (
        <div> 
           <ul>
           <li>{this.state.clubList[0]}</li>
           </ul>
          </div>
       );
    }

    else if (this.state.clubList.length == 2){
      return (
        <div> 
           <ul>
           <li>{this.state.clubList[0]}</li>
           <li>{this.state.clubList[1]}</li>

           
           </ul>
          </div>
       );
    }

    else if (this.state.clubList.length == 3){
     return (
      <div> 
         <ul>
         <li>{this.state.clubList[0]}</li>
         <li>{this.state.clubList[1]}</li>
         <li>{this.state.clubList[2]}</li>
         
         </ul>
        </div>
     );
  }

  if (this.state.clubList.length >3){
    return (
      <div> 
         <ul>
         <li>{this.state.clubList[0]}</li>
         <li>{this.state.clubList[1]}</li>
         <li>{this.state.clubList[2]}</li>
         <li>{this.state.clubList[3]}</li>
         </ul>
        </div>
     );
  }


}


    renderClasses = () =>  {
      if (this.state.classList.length == 0){
        return (
      <div>
          {`${this.state.userFirstName}`} isn't in any clubs!
      </div>
        );
      }

      if (this.state.classList.length == 1){
        return (
      <ul>
       <li>{this.state.classList[0]}</li>
      
    </ul>
        );
      }

      if (this.state.classList.length == 2){
     return (
      <ul>
      <li>{this.state.classList[0]}</li>
       <li>{this.state.classList[1]}</li>
    </ul>
        );
      }

      if (this.state.classList.length == 3){
        return (
      <ul>
        <li>{this.state.classList[0]}</li>
        <li>{this.state.classList[1]}</li>
        <li>{this.state.classList[2]}</li>
    </ul>
        );
      }

    }

  renderButton = () => {


  }
  render() {
    return (
      <div className="all">
        <NavLink to="/calendar" class="logo">
            <div className="dartCalLogoProfile">
                DartCal
                <div className="scheduleLogo"><img width="80px" src={logo}/></div>
            </div>
        </NavLink>
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
            <h6>Year</h6>
          </div>
          <div className="inputContainer">
            <div className="indivInput">
              <h6>{`${this.state.userFirstName} ${this.state.userLastName}`}</h6>
            </div>
            <div className="indivInput">
              <h6>{this.state.userEmail}</h6>
            </div>
            <div className="indivInput">
              <h6>{this.state.userYear}</h6>
            </div>
          </div>
        </div>

        <div className="classinfo">
          <div>
            <h3 className="sectionHeader">{`${this.state.userFirstName}`}'s Classes</h3>
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
            <h3 className="sectionHeader">Friends</h3>
          </div>
          <div class="grid-container">
            <div class="grid-item">
              <div className="imgStyle">
                <img class="a" src={this.state.friendsPics[0]} width="55%" height="55%"/>
                <p>{this.state.friendsNames[0]}</p>
              </div>
            </div>
              <div class="grid-item">
              <div className="imgStyle">
                <img class="a" src={this.state.friendsPics[1]} width="55%" height="55%"/>
                <p>{this.state.friendsNames[1]}</p>
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
          <Button>Friend {`${this.state.userFirstName}`}</Button>
        </div>
      </div>
    );
  }
}



// export default NewPost;
export default withRouter((FriendProfile));