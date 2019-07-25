import React, { Component } from "react";
import { Button, FormGroup, Label, Col, Input, Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, Row } from "reactstrap";
import "./App.css";
import logo from './img/favicon.ico';
import firebase from "./Firebase";
import Login from "./login";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uzenetek: [],
      
    };
    this.logout = this.logout.bind(this);
  }

  logout = () => {
    firebase.auth().signOut();
    return(<Login />)
  }

  showUserdata = () => {
    
    console.log(this.state.avatarUrl);
    
  }

  renderUzenetek = () => {};

  render() {
    this.showUserdata();
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
                <NavLink href="#" onClick={this.logout}><img src={this.state.avatarUrl} alt="avatar" width="30px" />Kijelentkezés</NavLink>
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
