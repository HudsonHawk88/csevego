import React, { Component } from "react";
import {
  Container,
  Col,
  Card,
  CardBody,
  CardTitle
} from "reactstrap";
import "../../App.css";
import firebase from "../../Firebase";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      avatarURL: "",
      avatar: "",
      progress: 0,
      isUploading: false
    };
 
  }
  showUser = () => {
    
    let user = firebase.auth().currentUser;
    let username, email, photoUrl;
    
    if (user != null) {
      username = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      
}
return(username + email + photoUrl);
  }

  render() {
    return (
      <Container id="container">
        <Card>
          <CardBody>
            <CardTitle>
              <Col className="text-center text-md-center">
                <h2>Profilom</h2>
              </Col>
            </CardTitle>
            {this.showUser()}
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default Profile;
