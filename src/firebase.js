import firebase from 'firebase';
import firebaseui from 'firebaseui';
import config from './firebase-config';

export const defaultApp = firebase.initializeApp(config);
export const ui = new firebaseui.auth.AuthUI(firebase.auth());
export default firebase;
