import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';

import 'firebase/compat/firestore';

export const firebaseConfig = {
    apiKey: "AIzaSyCmYVAzzgCucKigSd6Ntg6m5J1kONCu4cg",
    authDomain: "reactnativeweb-741f7.firebaseapp.com",
    projectId: "reactnativeweb-741f7",
    storageBucket: "reactnativeweb-741f7.appspot.com",
    messagingSenderId: "100075333037",
    appId: "1:100075333037:web:e7b16cf65d7606f369ed24"
}

if (!firebase.apps.length)
{
    firebase.initializeApp(firebaseConfig);
}