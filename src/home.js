import React, { Component } from "react";
import {
  Button,
  FormGroup,
  Label,
  Col,
  Input,
  Row
} from "reactstrap";
import "./App.css";
import firebase from "./Firebase";
import Login from "./login";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uzenetek: []
    };
    this.logout = this.logout.bind(this);
  }

  logout = () => {
    firebase.auth().signOut();
    return <Login />;
  };

  showUserdata = () => {};

  renderUzenetek = () => {};

  render() {
    this.showUserdata();
    return (
      <div id="tartalom" name="tartalom">
        <Row>
          <Col className="text-center text-md-center">
            <h2>Csevegőprogram</h2>
          </Col>
        </Row>
        <Row>
          <Col className="iras col-12 d-flex justify-content-center">
            <FormGroup row>
              <Label for="exampleText" lg={1}>
                Üzenet
              </Label>
              <Col>
                <Input type="textarea" name="text" id="exampleText" />
                <br />
              </Col>
              <Col>
                <Button type="submit" color="primary">
                  Küld
                </Button>
              </Col>
            </FormGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
