import firebase from 'firebase'
import noUserPic from '../pictures/noUser.png'


const firebaseConfig = {
    apiKey: "AIzaSyDrCgRkz4jQR0tRVrWkamdSxoqQhh18YM0",
    authDomain: "dartcal-d198f.firebaseapp.com",
    databaseURL: "https://dartcal-d198f.firebaseio.com",
    projectId: "dartcal-d198f",
    storageBucket: "dartcal-d198f.appspot.com",
    //messagingSenderId: "998609505236",
    //appId: "1:998609505236:web:08d07a52ef8fd4baf12441",
    //measurementId: "G-9CMQHTZN1V"
  };

  firebase.initializeApp(firebaseConfig);
  const ourDB = firebase.database();
  const ourAuth = firebase.auth();
  
  export function createUser (
    userID, userEmail, userFirstName, userLastName, userYear,) {
    
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.database().ref(`users/${user.uid}`).set({
          userID,
          userEmail,
          userFirstName,
          userLastName,
          userYear,
          userPic: noUserPic,
        });
      }
    });
}

export function getCurrUser(callBack) {
  console.log("getting user");
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // get the user id and accept a snapshot of information
      ourDB.ref(`users/${user.uid}`).on('value', (snapshot) => { 
        const currUser = snapshot.val(); // return the current user
        callBack(currUser); // call user into
      });
  }
});
}

export function getUser(userID, callback) {
  ourDB.ref(`users/${userID}/`).on('value', (snapshot) => {
    const User = snapshot.val(); 
    callback(User);
  });
}
 
export function getFriends(userID) {
  ourDB.ref(`users/${userID}/`).child('FriendsID').on('value', (snapshot) => {
    const friends = snapshot.val(); 
    return friends;
  });
}

export function getImage(userID) {
  ourDB.ref(`users/${userID}/`).child('userPic').on('value', (snapshot) => {
    const pic = snapshot.val(); 
    return pic;
  });
}
export function getName(userID) {
  ourDB.ref(`users/${userID}/`).child('userName').on('value', (snapshot) => {
  const name = snapshot.val(); 
  return name;
  });
}
export function getClass(userID) {
  ourDB.ref(`users/${userID}/`).child('classList').on('value', (snapshot) => {
    const classes = snapshot.val(); 
    return classes;
  });
}
export function getClubs(userID) {
      ourDB.ref(`users/${userID}/`).child('clubList').on('value', (snapshot) => {
        const clubs = snapshot.val(); 
        return clubs;
        });
  }

  export function addFriend(userID, friendID, callback) {
    firebase.database().ref('profile/${userID}/Friends').set(friendID);
  
    //database.ref(`Letters/${letterID}/`).child('likes').on('value', (snapshot) => {
      //callback(snapshot.numChildren());
    //});
  
  }

//export function addFriend(userID, friendID) {

  //ourDB.ref(`users/${userID}/Friends`).on('value', (snapshot) => {
    //var Friends = snapshot.val();
    //var friendArray = Friends.values();

    // console.log(userID)
    // console.log("what up")
    // console.log("type" + typeof Friends)
    // console.log(Friends)
    // //console.log(typeof Friends)
    // //console.log(Friends.Friends)
    // console.log("hello")

    // console.log('Friends', Friends) 
    // console.log('Friends.Friends', Friends.Friends) 

    //if ( Friends !== null && Array.isArray(Friends)){
    /* if(Friends && Friends.Friends){
      Friends.Friends.push(friendID);
    }
    else {
      Friends = {Friends: [friendID]}
    }

    ourDB.ref(`users/${userID}`).child('Friends').set({
          Friends
    }) */
  //});

  //var ref = firebase.database().ref().child('/scenes/' + projId).orderByChild('wordcount');
  //ref.once('value',function(snap) {
    //snap.forEach(function(item) {
        //var itemVal = item.val();
        //keys.push(itemVal);
    //});
    //for (i=0; i < keys.length; i++) {
        //counts.push(keys[i].wordcount);
    //}  

