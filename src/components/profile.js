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



class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: 'no user ID',
      userEmail: 'no email',
      userFirstName: ' first ',
      userLastName: ' last ',
      userFullName: 'username',
      userYear: 'no year',
      image: noUserPic,

      friendsIDs: [],
      friendsPics: [],
      friendsNames: [],

      bio: '',
      
      newClub: '',
      newClass: '',
      classes: '',
      classList: [],
      clubList: [],
      editing: false,
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
        editing: false,
      });

      if(currUser.Clubs != null) {
      var ClubList = []
      for (let i = 0; i < Object.keys(currUser.Clubs).length; i += 1) {
        const currentKey = Object.keys(currUser.Clubs)[i];
        const currItem = currUser.Clubs[currentKey];
  
        ClubList.push(currItem);

        this.setState ({
          clubList: ClubList,

        })
    
      }
    }

    if(currUser.Classes != null) {
    var Class = []
      for (let i = 0; i < Object.keys(currUser.Classes).length; i += 1) {
        const currentKey = Object.keys(currUser.Classes)[i];
        const currItem = currUser.Classes[currentKey];
  
       Class.push(` ${currItem} (${currentKey})`);

       this.setState ({
         classList: Class
       })
    
      }
    }
    if(currUser.Friends != null) {
    this.state.friendsPics = []
    this.state.friendsNames = []

    for (let i = 0; i < Object.keys(currUser.Friends).length; i += 1) {
      const currentKey = Object.keys(currUser.Friends)[i];
      const currItem = currUser.Friends[currentKey];
     db.getUser(currItem, this.setFriendInfo);
    
    }
  }
  
  }
  
  setFriendInfo = (user) => {
    var pics = this.state.friendsPics
    var names = this.state.friendsNames
    var IDs = this.state.friendsIDs
    pics.push(user.userPic);
    names.push(`${user.userFirstName} ${user.userLastName}`);
    IDs.push(user.userID);

    this.setState({
      friendsPics: pics,
      friendsNames: names,
      friendsIDs: IDs,
    })
  }

  onYearChange = (event) => {
    this.setState({userYear: event.target.value});
  }
  onImageChange = (event) => {
    this.setState({image: event.target.value});
  }
 
  onClubChange = (event) => {
    this.setState({ newClub: event.target.value });
  }

  onUsernameChange = (event) => {
    this.setState({ 
      userFirstName: event.target.value.split(" ")[0],
      userLastName: event.target.value.split(" ")[1] });
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


  onFirstUsernameChange= (event) => {
    this.setState({ firstusername: event.target.value });
  }

  onLastUsernameChange= (event) => {
    this.setState({ lastusername: event.target.value });
  }

  handleCancelButtonClick = (event) => {
    this.props.history.push('/');
  }

  populateFriend = (index) => {
    db.getUser(this.state.friendsIDs[index], this.goToFriend)
  }
  
  goToFriend = (FriendID) => {
    //FriendDB.populateFriendPage(this.state.currUser, FriendID)
    //this.props.history.push('/friendprofile');

  }

  toggleEdit = () => {
    if(this.state.editing) { //turning it back to false
    this.setState({ 
      editing:false,
    });
    db.saveEditUser(this.state.userID, this.state.userFirstName, this.state.userLastName, this.state.userYear, this.state.image)
  }
  else{
    this.setState({ 
      editing:true,
    });
  }
  }

  renderClubs = () => {
  
 
    return (
      <div> 
         <ul>
         { (this.state.clubList.length > 0) 
        ? <li>{this.state.clubList[0]}</li>
        : <div> </div>
         }
         { (this.state.clubList.length > 1) 
        ? <li>{this.state.clubList[1]}</li>
        : <div> </div>
         }
         { (this.state.clubList.length > 2) 
        ? <li>{this.state.clubList[2]}</li>
        : <div> </div>
         }
         { (this.state.clubList.length > 3) 
        ? <li>{this.state.clubList[3]}</li>
        : <div> </div>
         }
         {this.state.editing && (this.state.clubList.length < 4)
           ? <div><Input className="response"  placeholder="ex. Tri team" onChange={this.onClubChange} value={this.state.newClub} />
            <Button onClick={this.addNewClub}>Add Club</Button>  </div> 
          : <div></div>
  
         }
       
         </ul>
        </div>
     );
  }

    renderClasses = () =>  {
     
        return (
          <div> 
          <ul>
          { (this.state.classList.length > 0) 
         ? <li>{this.state.classList[0]}</li>
         : <div> </div>
          }
          { (this.state.classList.length > 1) 
         ? <li>{this.state.classList[1]}</li>
         : <div> </div>
          }
          { (this.state.classList.length > 2) 
         ? <li>{this.state.classList[2]}</li>
         : <div> </div>
          }
          { (this.state.classList.length > 3) 
         ? <li>{this.state.classList[1]}</li>
         : <div> </div>
          }
          {this.state.editing && (this.state.classList.length < 4)
            ?    <li>
            <Input className="response" placeholder="ex. ENGL37" onChange={this.onClassChange} value={this.state.newClass} />
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
           : <div></div>
          }
          </ul>
         </div>
      );

     

    }


  render() {
    return (
      <div className="all">
        <NavLink to="/calendar" class="logo">
          <div className="dartCalLogoProfile">
            DartCal
            <div className="scheduleLogo">
              <img width="80px" src={logo}/>
              </div>
          </div>
        </NavLink>
        <div className="profileinfo">
          <div>
            <h3 className="sectionHeader">Profile</h3>
            <div className="imgStyle">
            {this.state.editing
             ? <div>
               <h6>Insert Image URL</h6>  
             <Input className="response"  placeholder="Image URL " onChange={this.onImageChange}  value={this.state.image} />
              </div>
             :<img class="a" src={this.state.image} width="150" height="150"/>


            }
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
            {this.state.editing
             ? <Input className="response"  onChange={this.onUsernameChange} value={`${this.state.userFirstName} ${this.state.userLastName}`} />
              :<h6>{`${this.state.userFirstName} ${this.state.userLastName}`}</h6>
            }
            </div>
            <div className="indivInput">
              <h6>{this.state.userEmail}</h6>
            </div>
            <div className="indivInput">
              <h6>***********</h6>
            </div>
            <div className="indivInput">
              {this.state.editing
              ? <Input className="response"  onChange={this.onYearChange} value={this.state.userYear} />
              : <h6>{this.state.userYear}</h6>
            }
             
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
            <h3 className="sectionHeader">Friends</h3>
          </div>
          <div class="grid-container">
            <div class="grid-item">
              <div className="imgStyle">
                <img class="a" src={this.state.friendsPics[0]}  width="55%" height="55%"/>
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
              <div className="addFriends">
                <NavLink to="/searchfriends">
                  <img width="50px" src="https://cdn0.iconfinder.com/data/icons/social-media-glyph-1/64/Facebook_Social_Media_User_Interface-35-512.png" style={{ 'vertical-align':'middle', 'mix-blend-mode': 'soft-light'}}/> 
                  Add Friends
                </NavLink>
              </div>
          </div>
        </div>
        <div className="editOrFollowButton">
        {this.state.editing
         ? <Button onClick={this.toggleEdit}>Save Profile</Button>
         :<Button onClick={this.toggleEdit}>Edit Profile</Button>
        }
        </div>
        <div className="logoutContainer">
          <img width="50px" src="https://cdn3.iconfinder.com/data/icons/mixed-communication-and-ui-pack-1/48/general_pack_NEW_glyph_logout_signout-512.png" style={{ 'vertical-align':'middle', 'mix-blend-mode': 'soft-light'}}/> 
          <NavLink to="/" >Logout</NavLink>
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
export default withRouter((Profile));