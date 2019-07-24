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
  CardTitle
} from "reactstrap";
import "./App.css";
import firebase from './Firebase';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  login = (e) => {
    
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).catch((error) => {
        console.log(error);
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
        <Card>
          <CardBody>
            <CardTitle>
              <h2>Bejelentkezés</h2>
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
              <Button type="submit" onClick={this.login()}>Bejelentkezés</Button>
              <Button onClick={this.sendEmailVerification}>E-mail ellenőrzés</Button>
            </Form>
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default Login;
