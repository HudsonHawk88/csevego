import React, { Component } from "react";
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
import Profile from './profile';

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

    firebase
      .storage()
      .ref("profilPictures")
      .child(this.state.username)
      .child(filename)
      .getDownloadURL()
      .then(URL => {
        this.setState({ avatarURL: URL });
        console.log(this.state.avatarURL);
        let user = {
          username: this.state.username,
          avatarURL: this.state.avatarURL
        };
        firebase
          .database()
          .ref("users")
          .child(this.state.username)
          .push(user);
      });
  }

  onFeltolt = () => {
    firebase.auth().currentUser.updateProfile({
        displayName: this.state.username,
        photoURL: JSON.stringify(this.state.avatarURL)
      });
      console.log(firebase.auth().currentUser.displayName)
      console.log(firebase.auth().currentUser.photoURL)
      return(<Profile />)
  }
render(){
return(
<Container id="container">
        <Card>
          <CardBody>
            <CardTitle>
              <Col className="text-center text-md-center">
                <h2>Profilom</h2>
              </Col>
            </CardTitle>
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
                <br />
                {this.state.isUploading && (
                  <p>Progress: {this.state.progress}</p>
                )}
                {this.state.avatarURL && (
                  <img src={this.state.avatarURL} alt="avatar" />
                )}
                <FileUploader
                  accept="image/*"
                  name="avatar"
                  storageRef={firebase
                    .storage()
                    .ref("profilPictures")
                    .child(this.state.username)}
                  onUploadStart={this.handleUploadStart}
                  onUploadError={this.handleUploadError}
                  onUploadSuccess={this.handleUploadSuccess}
                  onProgress={this.handleProgress}
                />
              </FormGroup>
            </Col>
            <Button
              type="submit"
              color="primary"
              onClick={this.onFeltolt}
            >
              Elküld
            </Button>
          </CardBody>
        </Card>
        </Container>
)
}
}
export default ChangeUserData;