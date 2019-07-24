import React, { Component } from "react";
import {
  Container,
  Form,
  Button,
  FormGroup,
  Label,
  Col,
  Input,
  Card,
  CardBody,
  CardTitle,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  Row, 
  NavbarToggler,
  Collapse
} from "reactstrap";
import "./App.css";
import firebase from './Firebase';

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signUp = this.signUp.bind(this);
    this.state = {
      email: "",
      password: ""
  }
  }
  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  signUp(e) {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).then((u)=>{console.log(u)})
    .catch((error) => {
        // console.log(error);
      })
  }

  login(e) {
    
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).catch((error) => {
        // console.log(error);
      });
      
  }

  sendEmailVerification = () => {
    // [START sendemailverification]
    firebase.auth().currentUser.sendEmailVerification().then(function() {
      // Email Verification sent!
      // [START_EXCLUDE]
      alert('E-mail ellenőrzés elküldve!');
      // [END_EXCLUDE]
    });
    // [END sendemailverification]
}

sendPasswordReset = () => {
    var email = document.getElementById('emailreg').value;
    // [START sendpasswordemail]
    firebase.auth().sendPasswordResetEmail(email).then(function() {
      // Password Reset Email Sent!
      // [START_EXCLUDE]
      alert('Jelszó visszaállítás elküldve!');
      // [END_EXCLUDE]
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/invalid-email') {
        alert(errorMessage);
      } else if (errorCode === 'auth/user-not-found') {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    });
    // [END sendpasswordemail];
  }
  render() {
    return (
      <Container>
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
        <Card>
          <CardBody>
            <CardTitle>
              <h2>Regisztráció / Bejelentkezés</h2>
            </CardTitle>
            <Form className="form">
              <Col>
                <FormGroup>
                  <Label>E-mail cím</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="myemail@email.com"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="examplePassword">Jelszó</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="********"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
              <Button type="submit" onClick={this.signUp}>Regisztrálok</Button>
              <Button type="submit" onClick={this.login}>Bejelentkezés</Button>
              {/* <Button onClick={this.sendEmailVerification}>E-mail ellenőrzés</Button> */}
            </Form>
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default Login;
