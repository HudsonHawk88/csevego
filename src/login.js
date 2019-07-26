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
  Row
} from "reactstrap";
import "./App.css";
import firebase from "./Firebase";

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signUp = this.signUp.bind(this);
    this.state = {
      users: [],
      user: "",
      email: "",
      password: ""
    };
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  signUp = e => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(this.sendEmailVerification)
      .catch(error => {
        let errorCode = error.code;

        if (errorCode === "auth/email-already-in-use") {
          alert(
            "Ezzel az E-mail címmel már regisztráltál! Kérjük jelentkezz be vele! Ha pedig elfelejtetted a jelszavad, akkor kérlek kattints az Elfelejtett jelszó gombra!"
          );
        }
        if (errorCode === "auth/weak-password") {
          alert(
            "A jelszó túl gyenge! A jelszónak legalább 6 karakternek kell lennie!"
          );
        }
      });
  };

  login(e) {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => {
        let errorCode = error.code;
        console.log(errorCode);
        if (errorCode === "auth/user-not-found") {
          alert(
            "Nincs ilyen felhasználó vagy a fiókodat törölték! Kérlek ellenőrizd a bevitt adatokat vagy regisztrálj!"
          );
        }
        if (errorCode === "auth/user-disabled") {
          alert("Fiókodat a rendszergazda letiltotta!");
        }
        if (errorCode === "auth/wrong-password") {
          alert("Nem jó jelszó! Kérlek ellenőrizd a beírt jelszavadat!");
        }
      });
  }
  sendEmailVerification = () => {
    // [START sendemailverification]
    firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then(function() {
        // Email Verification sent!
        // [START_EXCLUDE]
        alert("E-mail ellenőrzés elküldve!");
        // [END_EXCLUDE]
      });
    // [END sendemailverification]
  };

  sendPasswordReset = () => {
    var email = this.state.email;
    // [START sendpasswordemail]
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(function() {
        // Password Reset Email Sent!
        // [START_EXCLUDE]
        alert("Jelszó visszaállítás elküldve!");
        // [END_EXCLUDE]
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        // [START_EXCLUDE]
        if (errorCode === "auth/invalid-email") {
          alert(
            "Nincs megadva E-mail cím! Kérelek írd be az E-mail címed, amivel regisztráltál!"
          );
        }
        if (errorCode === "auth/user-disabled") {
          alert(
            "Nincs ilyen felhasználó vagy fiókodat törölték! Kérlek ellenőrizd a megadott adatokat vagy regisztrálj!"
          );
        }
        console.log(errorCode);
        // [END_EXCLUDE]
      });
    // [END sendpasswordemail];
  };
  render() {
    return (
      <Container>
        <br />
        <Row>
          <Col className="text-center text-md-center">
            <h2>Csevegőprogram</h2>
          </Col>
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
              <Button type="submit" onClick={this.signUp} color="primary">
                Regisztrálok
              </Button>
              &nbsp;
              <Button type="submit" onClick={this.login} color="success">
                Bejelentkezés
              </Button>
              &nbsp;
              <Button onClick={this.sendPasswordReset} color="info">
                Elfelejtett jelszó
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default Login;
