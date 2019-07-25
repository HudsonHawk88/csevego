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
import FileUploader from "react-firebase-file-uploader";

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
      password: "",
      avatar:"",
      avatarURL: "",
      username: "",
      progress: 0,
      isUploading: false
  }
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  
  handleProgress = progress => this.setState({ progress });

  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = (filename) => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    
    firebase
      .storage()
      .ref("profilPictures")
      .child(this.state.username)
      .child(filename)
      .getDownloadURL()
      .then((URL) => 
      {
        this.setState({avatarURL: URL})
        console.log(this.state.avatarURL)
        let user = {username: this.state.username , avatarURL: this.state.avatarURL}
        firebase.database().ref('users').child(this.state.username).push(user);
      });
      
      
  }
  signUp = (e) => {
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(this.sendEmailVerification)
    .catch((error) => {
      let errorCode = error.code;
      
      if (errorCode === 'auth/email-already-in-use')
      {alert('Ezzel az E-mail címmel már regisztráltál! Kérjük jelentkezz be vele! Ha pedig elfelejtetted a jelszavad, akkor kérlek kattints az Elfelejtett jelszó gombra!')}
      if (errorCode === 'auth/weak-password')
      {alert('A jelszó túl gyenge! A jelszónak legalább 6 karakternek kell lennie!')}
});
  
  }

  login(e) {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .catch((error) => {
        let errorCode = error.code;
      console.log(errorCode)
      if (errorCode === 'auth/user-not-found')
      {alert('Nincs ilyen felhasználó vagy a fiókodat törölték! Kérlek ellenőrizd a bevitt adatokat vagy regisztrálj!')}
      if (errorCode === 'auth/user-disabled')
      {alert('Fiókodat a rendszergazda letiltotta!')}
      if (errorCode === 'auth/wrong-password')
      {alert('Nem jó jelszó! Kérlek ellenőrizd a beírt jelszavadat!')}
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
    var email = this.state.email;
    // [START sendpasswordemail]
    firebase.auth().sendPasswordResetEmail(email).then(function() {
      // Password Reset Email Sent!
      // [START_EXCLUDE]
      alert('Jelszó visszaállítás elküldve!');
      // [END_EXCLUDE]
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      // [START_EXCLUDE]
      if (errorCode === 'auth/invalid-email') {
        alert("Nincs megadva E-mail cím! Kérelek írd be az E-mail címed, amivel regisztráltál!");
      } if (errorCode === 'auth/user-disabled') {
        alert("Nincs ilyen felhasználó vagy fiókodat törölték! Kérlek ellenőrizd a megadott adatokat vagy regisztrálj!");
      }
      console.log(errorCode);
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
              <Col>
                <FormGroup>
                  <Label for="username">Felhasználónév</Label>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder=""
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                <label>Avatar / Profilkép:</label>
                {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
                {this.state.avatarURL && <img src={this.state.avatarURL} alt="avatar" />}
                <FileUploader
                  accept="image/*"
                  name="avatar"
                  storageRef={firebase.storage().ref("profilPictures").child(this.state.username)}
                  onUploadStart={this.handleUploadStart}
                  onUploadError={this.handleUploadError}
                  onUploadSuccess={this.handleUploadSuccess}
                  onProgress={this.handleProgress}
                />
                </FormGroup>
              </Col>
              <Button 
              type="submit" 
              onClick={this.signUp}
              color="primary"
              >
              Regisztrálok
              </Button>&nbsp;
              <Button type="submit" onClick={this.login} color="success">Bejelentkezés</Button>&nbsp;
              <Button onClick={this.sendPasswordReset} color="info">Elfelejtett jelszó</Button>
            </Form>
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default Login;
