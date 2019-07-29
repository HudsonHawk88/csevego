import React, { Component } from "react";
import { Button, FormGroup, Label, Col, Input, Row, Toast, ToastBody, ToastHeader} from "reactstrap";
import "./App.css";
import firebase from "./Firebase";
import Login from "./login";
import defaultAvatar from './img/favicon.ico';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uzenetek: [],
      username: "",
      avatarURL: "",
      formUzenet: "",
    };
    this.logout = this.logout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  newDate = () => {new Date().toLocaleDateString("hu-HU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  })}
  
  logout = () => {
    firebase.auth().signOut();
    return <Login />;
  };

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  uuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  showUserdata = () => {
    
      // let user = firebase.auth().currentUser;
      // let emailVerified
  
      // if (user != null) {
      //   emailVerified = user.emailVerified;
      // }
      // if (emailVerified === false){
      //   this.logout();
      //   alert("Nincs ellenőrizve az email címed! Kérjük kattintson az ellenőrző email-ben levő linkre a profilja aktiválásához, majd jelentkezzen be!");
      // }
  
    }

    addMessage = uzenet => {
      const refMessages = firebase.database().ref("messages").child(uzenet.datenow);
      console.log(uzenet.datenow);
      refMessages.push(uzenet);
      this.componentDidMount();
    };


    componentDidMount() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({ user });
        } 
      });
      
      firebase.database().ref('messages').on('value', snapshot => {
        let uzenetek1 = [];
        let uzenetek = snapshot.val();
        snapshot.forEach(snapshot => {
          uzenetek = snapshot.val();
          
        for (let item in uzenetek) {
          uzenetek1.push({
            id: uzenetek[item].id,
            name: uzenetek[item].name,
            message: uzenetek[item].message,
            avatar: uzenetek[item].avatar ,
            date: uzenetek[item].date,
            
         });
       
       
        }
        this.setState({uzenetek: uzenetek1});
        
      });
    });
  }
  renderUzenetek = () => {
    return this.state.uzenetek.map(item => {
    return(
      <p align="center">
          <Toast key={this.uuidv4()} className="p-3 bg-primary my-2 rounded">
          <ToastHeader><img src={item.avatar ? (item.avatar) : (defaultAvatar)} alt="avatar" width="30px" /> {item.name}  {item.date}</ToastHeader>
          <ToastBody> {item.message}</ToastBody><br />
          </Toast>
      </p>
    )}).reverse(this.state.uzenetek);
    }
  

  render() {
    this.showUserdata();
    const { formUzenet } = this.state;
    return (
      <div id="tartalom" name="tartalom">
        <Row>
          <Col className="text-center text-md-center">
            <h2>Csevegőprogram</h2>
          </Col>
        </Row>
        <Row>
          <Col className="iras col-12 center">
            <FormGroup row>
              <Label for="exampleText" lg={1}>
                Üzenet
              </Label>
              <Col>
                <Input type="textarea" name="formUzenet" id="formUzenet" value={formUzenet} onChange={this.handleChange} />
                <br />
              </Col>
              <Col>
                <Button
                color="primary"
                onClick={() => {
                  this.addMessage({
                    id: this.uuidv4(),
                    message: formUzenet,
                    name: firebase.auth().currentUser.displayName,
                    avatar: firebase.auth().currentUser.photoURL ? (firebase.auth().currentUser.photoURL) : ({defaultAvatar}) ,
                    date: new Date().toLocaleDateString("hu-HU", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric"
                    }),
                    datenow: Date.now(),
                  })
                  this.setState({formUzenet: ""});
                  
                }}>
                  Küld
                </Button>
              </Col>
            </FormGroup>
          </Col>
        </Row>
        {this.renderUzenetek()}
      </div>
    );
  }
}

export default Home;
