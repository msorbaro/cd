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

// idk if this works
export const signup = (email, password) =>
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then((_) => firebase.auth()
            .createUserWithEmailAndPassword(email, password)
        )
        .catch((error) => {
            return Promise.reject(error)
        })

export function signOut () {
firebase.auth().signOut().then(() => {
  console.log('logged out');
      }).catch((error) => {
  console.log('wait, could not sign out');
      });
  }

  /**
 * Send verification email.
 *
 * @function verifyEmail
 * @returns {Promise} Contains `void` when resolved.
 */
export function verifyEmail (email) {
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then((_) =>
        firebase.auth().currentUser.sendEmailVerification({
            url: `${email}${
                firebase.auth().currentUser.email
            }`,
        })
    )
  }


export function getCurrUser(callBack) {
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



export function getUser(userID, callBack) {
   
      // get the user id and accept a snapshot of information
      ourDB.ref(`users/${userID}`).on('value', (snapshot) => { 
        const currUser = snapshot.val(); // return the current user
        callBack(currUser); // call user into
        console.log(snapshot);
      });
}

export function getUserID(userFirstName, userLastName, callBack) {
  console.log("inside of getUserID ");
  console.log("firstName: " + userFirstName);
  console.log("lastName: " + userLastName);
  console.log("callBack " + callBack);

   
  // get the user id and accept a snapshot of information
  ourDB.ref(`users/`).on('value', (snapshot) => { 
    var uL = snapshot.val();
    var thisUserID = [];
    // get list of users
    for (let i = 0; i < Object.keys(uL).length; i += 1) {
      const currentKey = Object.keys(uL)[i];
      const currItem = uL[currentKey]; // the user
      
      var firstName = currItem.userFirstName; // typeof is a string
      var lastName = currItem.userLastName; // typeof is a string
      
      if(firstName === userFirstName && lastName === userLastName) {
        thisUserID.push(currentKey);
      }
      
      console.log(uL);
    }

    console.log("the user id " + thisUserID);
    console.log("should be: yvKgKo5tmNXtKbIVtL6k6bYcQ6X2")
    callBack(thisUserID); // call user into
  });
}


export function getUserAndCal(callBack) {
  console.log("getting user");
  
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // get the user id and accept a snapshot of information
      ourDB.ref(`users/${user.uid}`).on('value', (snapshot) => { 
        const currUser = snapshot.val(); // return the current user
       // callBack(currUser); // call user into
    
        ourDB.ref(`users/${currUser.userID}/`).child('CalEvents').on('value', (snapshot) => {
          const calEvents = snapshot.val(); 
          callBack(calEvents, currUser)
  });
});
}
});
}

 
// returns an object/array
export function getFriends(userID, callback) {
  ourDB.ref(`users/${userID}/`).child('Friends').on('value', (snapshot) => {
    const friends = snapshot.val(); 
    if (friends != null) {
    callback(friends); }
  });
}

export function getFriendStatus(userID, callback) {
    const ref = ourDB.ref(`users/${userID}/`);
    ref.orderByValue().equalTo(userID).on('value', (snapshot) => {
      callback(snapshot.numChildren());
    });
  }

export function getImage(userID, callback) {
  ourDB.ref(`users/${userID}/`).child('userPic').on('value', (snapshot) => {
    const pic = snapshot.val(); 
    callback(pic)
  });
}

export function getName(userID, callback) {
  ourDB.ref(`users/${userID}/`).child('userFirstName').on('value', (snapshot) => {
  const name = snapshot.val(); 
  
  callback(name);
  });
}

export function getClass(userID, callback) {
  ourDB.ref(`users/${userID}/`).child('Classes').on('value', (snapshot) => {
    const classes = snapshot.val(); 
    if (classes != null) {
    callback(classes);
    }
  });
}

export function getClubs(userID, callback) {
      ourDB.ref(`users/${userID}/`).child('Clubs').on('value', (snapshot) => {
        const clubs = snapshot.val(); 
        if(clubs != null) {
        callback(clubs);}
        });
  }

  export function addFriend(userID, friendID) {
    const ref = ourDB.ref(`users/${userID}/Friends/`);
    ref.orderByValue().equalTo(friendID).on('value', (snapshot) => {
      if ((snapshot.numChildren()) === 0) {
        ourDB.ref(`users/${userID}/Friends/${friendID}`).set(friendID);
      }
    });
  }

  export function addClass(userID, classBlock, className) {
    const ref = ourDB.ref(`users/${userID}/Classes/`);
    ref.orderByValue().equalTo(classBlock).on('value', (snapshot) => {
      if ((snapshot.numChildren()) === 0) {
        ourDB.ref(`users/${userID}/Classes/${classBlock}`).set(className);
      }
    });
  }



  export function addClub(userID, clubID) {
    const ref = ourDB.ref(`users/${userID}/Clubs/`);
    ref.orderByValue().equalTo(clubID).on('value', (snapshot) => {
      if (snapshot.numChildren() === 0) {
        ourDB.ref(`users/${userID}/Clubs/${clubID}`).set(clubID);
      }
    });
  }

  export function incrementCalID(userID, num) {
    ourDB.ref(`users/${userID}/calID`).updateData({'calID': num.increment(1)});
  }

  export function addCalEvent(userID, calEventID, calEventInfo) {
    const ref = ourDB.ref(`users/${userID}/`);
    ref.orderByValue().equalTo(calEventID).on('value', (snapshot) => {
     if (snapshot.numChildren() === 0) {
      ourDB.ref(`users/${userID}/CalEvents/${calEventID}`).set(calEventInfo);
     }
    });
  }

  export function deleteCalEvent(userID, calEventID, callback) {
    console.log(calEventID)
    firebase.database().ref(`users/${userID}/CalEvents`).child(calEventID).remove();
    ourDB.ref(`users/${userID}/`).child('CalEvents').on('value', (snapshot) => {
      const calEvents = snapshot.val(); 
      callback(calEvents)
   });
  }


  export function getCalEvents(userID, callback) {
    ourDB.ref(`users/${userID}/`).child('CalEvents').on('value', (snapshot) => {
     const calEvents = snapshot.val(); 
     callback(calEvents)
  });

   
  }; 
   

  // export function getClubStatus(userID, clubID) {
  //   const ref = ourDB.ref(`users/${userID}/`);
  //   ref.orderByValue().equalTo(clubID).on('value', (snapshot) => {
  //     callback(snapshot.numChildren());
  //   });
  // }

  export function getClassStatus(userID, classID, callback) {
    const ref = ourDB.ref(`users/${userID}/`);
    ref.orderByValue().equalTo(classID).on('value', (snapshot) => {
      console.log(snapshot);
      callback(snapshot.numChildren());
    });
  
}

export function getListOfUsers(callback) {
  const ref = ourDB.ref(`users/`); 
  ref.on('value', (snapshot) => {
    callback(snapshot.val());
  });
}


export function saveEditUser(userId, first, last, year, userPic) {
  ourDB.ref(`users/${userId}/userPic`).set(userPic);
  ourDB.ref(`users/${userId}/userFirstName`).set(first);
  ourDB.ref(`users/${userId}/userLastName`).set(last);
  ourDB.ref(`users/${userId}/userYear`).set(year);

}