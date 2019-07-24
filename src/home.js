import React, { Component } from "react";
import { Button, FormGroup, Label, Col, Input, Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, Row } from "reactstrap";
import "./App.css";
import firebase from "./Firebase";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uzenetek: [],
      username: null,
      avatar: null,
      formUzenet: undefined,
      formdatum: undefined,
      formsender: undefined
    };
  }

  logout = () => {
    firebase.auth().signOut();
  }

  renderUzenetek = () => {};

  render() {
    return (
      <div>
      <Navbar color="dark" expand="md">
          <NavbarBrand href="/">Csevegő</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="col-12 d-flex justify-content-center" navbar>
              <NavItem>
                <NavLink href="/components/">Főoldal</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/components/">Letöltések</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/components/">GDPR</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onclick={this.logout()}>Kijelentkezés</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <br />
        <Row >
            <Col className="text-center text-md-center"><h2>Csevegőprogram</h2></Col>
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
