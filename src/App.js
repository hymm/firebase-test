import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Grid, Row, Col, Navbar, Nav, MenuItem, NavDropdown, NavItem, } from 'react-bootstrap';
import firebase from './firebase';
import UserPane from './user-pane';
import UserMenu from './user-menu';

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
      <Grid fluid>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">React-Bootstrap</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <UserMenu uid={this.state.uid} username={this.state.username}/>
            <NavItem eventKey={1} href="#">Link</NavItem>
            <NavItem eventKey={2} href="#">Link</NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.4}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>
        <Row>
          <Col md={12}>
            <UserPane />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
