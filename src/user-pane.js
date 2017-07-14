import React from 'react';
import firebase from './firebase';
import FirebaseUi from './firebaseui';

export default class UserPane extends React.Component {
  deleteAccount = () => {
    firebase.auth().currentUser.delete().catch((error) => {
      if (error.code === 'auth/requires-recent-login') {
        // The user's credential is too old. She needs to sign in again.
        firebase.auth().signOut().then(() => {
          // The timeout allows the message to be displayed after the UI has
          // changed to the signed out state.
          setTimeout(() => {
            alert('Please sign in again to delete your account.');
          }, 1);
        });
      }
    });
  }

  render() {
    return (
      <section className="add-item">
        <FirebaseUi />
        <button onClick={this.deleteAccount}>Delete Account</button>
      </section>
    );
  }
}
