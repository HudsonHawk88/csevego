import React, { Component } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Row,
    Col,
    } from 'reactstrap';
import Signup from "./signup";
import Login from "./login";
import firebase from "firebase";
import "./App.css";

class LandingPage extends Component {
  constructor(props) {
      super(props);
      this.toggle = this.toggle.bind(this);
      this.state = ({
        isOpen: false,
        user: null
      });
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }

    componentDidMount() {
      this.authListener();
    }
  
    authListener = () => {
      firebase.auth().onAuthStateChanged((user) => {
        console.log(user);
        if (user) {
          this.setState({ user });
          localStorage.setItem('user', user.uid);
        } else {
          this.setState({ user: null });
          localStorage.removeItem('user');
        }
      });
    }
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
            </Nav>
          </Collapse>
        </Navbar>
        <br />
        <Row >
            <Col className="text-center text-md-center"><h2>Csevegőprogram</h2></Col>
        </Row>
        <br />
        <Row>
            <Col>
                <Signup />
            </Col>
            <Col>
                <Login />
            </Col>
        </Row>
        </div>
    );
  }
}

export default LandingPage;

