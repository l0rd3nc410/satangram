import firebase from 'firebase';

firebase.initializeApp({
    apiKey: "AIzaSyAs_xfJ8CSGSZFbsu7IjAGbxPwmKU3Bdlo",
    authDomain: "shitpostland-c21b4.firebaseapp.com",
    projectId: "shitpostland-c21b4",
    storageBucket: "shitpostland-c21b4.appspot.com",
    messagingSenderId: "910092965893",
    appId: "1:910092965893:web:27113a8f574c8c71d6a46c",
    measurementId: "G-CYBS717GL4"
});

const database = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const functions = firebase.functions();

export {database, auth, storage, functions};