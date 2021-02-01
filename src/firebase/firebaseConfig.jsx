import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

    //lo obtengo desde firebase al crear un proyecto ahi
 const firebaseConfig = {
    apiKey: "AIzaSyDAdtIxVBFLJT9FiYoMUN2XNoc6yyjFkRE",
    authDomain: "react-journal-app-fb4b0.firebaseapp.com",
    projectId: "react-journal-app-fb4b0",
    storageBucket: "react-journal-app-fb4b0.appspot.com",
    messagingSenderId: "853567574326",
    appId: "1:853567574326:web:680102ef5f7f2bd941e397",
    measurementId: "G-0T19MNCQJ3"
  };

  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

  //para conectarme con google
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
      db,
      googleAuthProvider,
      firebase
  }