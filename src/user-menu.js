import React from 'react';
import { NavDropdown, MenuItem, } from 'react-bootstrap';
import firebase from './firebase';

export default class UserMenu extends React.Component {
  render() {
    const username = this.props.username ? this.props.username : 'Guest';
    const LoggedInMenu = [
      <MenuItem onClick={() => firebase.auth().signOut()}>Logout</MenuItem>
    ];

    const LoggedOutMenu = [
      <MenuItem eventKey={3.1}>Login</MenuItem>
    ];

    return (
      <NavDropdown eventKey={3} title={username} id="basic-nav-dropdown">
        {
          this.props.uid ?
          LoggedInMenu :
          LoggedOutMenu
        }
      </NavDropdown>
    );
  }
}
