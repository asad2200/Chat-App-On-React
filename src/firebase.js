import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBH6vZUGBN6nwlTyI4t2ioJp5TcSYz9DRU",
    authDomain: "messenger-clone-asad.firebaseapp.com",
    projectId: "messenger-clone-asad",
    storageBucket: "messenger-clone-asad.appspot.com",
    messagingSenderId: "608969957195",
    appId: "1:608969957195:web:81d570150cffe061d492ce",
    measurementId: "G-767NHYVY5V"
});

const db = firebaseApp.firestore();

export default db;