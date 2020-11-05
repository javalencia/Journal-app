import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

console.log( process.env )


const firebaseConfig = {
    apiKey: 'AIzaSyBX9c1PXetGvOPk7lIgrlmGuZWGlY5PD0s',
    authDomain: 'journal-app-e7878.firebaseapp.com',
    databaseURL: 'https://journal-app-e7878.firebaseio.com',
    projectId: 'journal-app-e7878',
    storageBucket: 'journal-app-e7878.appspot.com',
    messagingSenderId: '119410480149',
    appId: '1:119410480149:web:ddf8d2f6810db0bd5aea1',
  };

firebase.initializeApp( firebaseConfig );


const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    firebase
}