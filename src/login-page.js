import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import UserPane from './user-pane';

export default class LoginPage extends React.Component {
  render() {
    return (
        this.props.uid ?
        <Redirect to={`/user`} /> :
        <Grid fluid>
          <Row>
            <Col md={12}>
              <UserPane />
            </Col>
          </Row>
        </Grid>
    );
  }
}
