import React, { Component, Fragment } from "react";
import {
  Container,
  Button,
  FormGroup,
  Label,
  Col,
  Input,
  Card,
  CardBody,
  CardTitle
} from "reactstrap";
import "../../App.css";
import firebase from "../../Firebase";
import FileUploader from "react-firebase-file-uploader";
import Profile from "./profile";

class ChangeUserData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      avatarURL: "",
      avatar: "",
      progress: 0,
      isUploading: false
    };
    this.handleChange = this.handleChange.bind(this);
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

  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    let username = firebase.auth().currentUser.displayName;
    if (firebase.auth().currentUser.displayName === null){
    firebase
      .storage()
      .ref("profilPictures")
      .child(username)
      .child(filename)
      .getDownloadURL()
      .then(URL => {
        this.setState({ avatarURL: URL });
      })
    }
    else {
        firebase
      .storage()
      .ref("profilPictures")
      .child(username)
      .child(filename)
      .getDownloadURL()
      .then(URL => {
        this.setState({ avatarURL: URL });
      })
    }
  }

  onFeltolt = () => {
    if (firebase.auth().currentUser.displayName === null){
    firebase.auth().currentUser.updateProfile({
      displayName: this.state.username,
      photoURL: this.state.avatarURL
    });
    console.log("displayName = username = nincs")
    return <Profile />;
}
else {
    firebase.auth().currentUser.updateProfile({
    username: firebase.auth().currentUser.displayName,
    photoURL: this.state.avatarURL
    });
    console.log("displayName = username = volt")
    return <Profile />;
}
  }
    showData = () => {
        let currentUser = firebase.auth().currentUser;
        let username, photoUrl;
        console.log(currentUser)
        if (currentUser != null) {
        username = currentUser.displayName;
        photoUrl = currentUser.photoURL;
        }
        return (<Container id="container">
        <Card>
          <CardBody>
            <CardTitle>
              <Col className="text-center text-md-center">
                <h2>Profilom</h2>
              </Col>
            </CardTitle>
            {username ? (
                (
                    <Col>
                    </Col>
                    )
            ) : (
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
            ) }
            <Col>
              <FormGroup>
                <label>Avatar / Profilkép:</label>
                <br />
                {this.state.isUploading && (
                  <p>Progress: {this.state.progress}</p>
                )}
                {this.state.avatarURL && (
                  <img src={this.state.avatarURL} alt="avatar" />
                )}
                {username ? (
                    <FileUploader
                    accept="image/*"
                    name="avatar"
                    storageRef={firebase
                      .storage()
                      .ref("profilPictures")
                      .child(username)
                    }
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccess}
                    onProgress={this.handleProgress}
                  />
                ) : (
                    <FileUploader
                    accept="image/*"
                    name="avatar"
                    storageRef={firebase
                      .storage()
                      .ref("profilPictures")
                      .child(this.state.username)
                    }
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccess}
                    onProgress={this.handleProgress}
                  />
                )}
                
              </FormGroup>
            </Col>
            <Button type="submit" color="primary" onClick={this.onFeltolt}>
              Elküld
            </Button>
          </CardBody>
        </Card>
      </Container>)
      
  }
 

  render() {
      
    return (
      <Fragment>{this.showData()}</Fragment>
    )
  }
  
}
export default ChangeUserData;
