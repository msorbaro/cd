import firebase from 'firebase'

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

  const database = firebase.database();
  
  
  export function create () {
  if ((this.state.email.endsWith('@dartmouth.edu') || this.state.email.endsWith('@Dartmouth.edu')) && this.state.password === this.state.passwordTwo) {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
      alert(error);
    });
  
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.database().ref(`users/${user.uid}`).set({
          email: this.state.email,
          username: `${this.state.firstusername} ${this.state.lastusername}`,
        });
        user.updateProfile({
          displayName: `${this.state.firstusername} ${this.state.lastusername}`,
        });
        console.log('pushing history');
        this.props.history.push('/');
      }
    });
  } else if (!this.state.email.endsWith('@dartmouth.edu')) {
    alert('Please enter a dartmouth.edu email');
  } else {
    alert('Make sure passwords match');
  }
}