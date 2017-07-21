import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Navbar, Nav, MenuItem, NavDropdown, NavItem, } from 'react-bootstrap';
import { BrowserRouter, Route, } from 'react-router-dom';
import firebase from './firebase';
import LoginPage from './login-page';

const storageKey = 'STORAGEKEYNAME';

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      uid: null,
    };
  }

  removeItem(itemId) {
      const itemRef = firebase.database().ref(`/items/${itemId}`);
      itemRef.remove();
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user)
        window.localStorage.setItem(storageKey, user.uid);
        this.setState({ uid: user.uid, username: user.displayName });
      } else {
        window.localStorage.removeItem({storageKey});
        this.setState({ uid: null, username: 'Guest' });
      }
    });
      /*const itemsRef = firebase.database().ref('items');
      itemsRef.on('value', (snapshot) => {
         let items = snapshot.val();
         let newState = [];
         for (let item in items) {
             newState.push({
                 id: item,
                 title: items[item].title,
                 user: items[item].user,
             });
         }
         this.setState({
             items: newState
         });
      })*/
  }

  render() {
    return (
      <BrowserRouter>
        <div>

          <Route path="/login" component={() => <LoginPage uid={this.state.uid} /> } />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
