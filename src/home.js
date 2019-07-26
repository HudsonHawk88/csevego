import React, { Component } from "react";
import { Button, FormGroup, Label, Col, Input, Row, Card, CardBody, CardTitle } from "reactstrap";
import "./App.css";
import firebase from "./Firebase";
import Login from "./login";
import { get } from "http";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uzenetek: [],
      username: "",
      avatarURL: "",
    };
    this.logout = this.logout.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

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

    addMessage = message => {
      const refMessages = firebase.database().ref("users").child("messages").child(message.id);
      refMessages.push(message);
      this.componentDidMount();
    };


    omponentDidMount() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({ user });
        } 
      });
      
      firebase.database().ref('users').child("messages").on('value', snapshot => {
        let uzenetek1 = [];
        let uzenetek = snapshot.val();
        snapshot.forEach(snapshot => {
          uzenetek = snapshot.val();
        for (let item in uzenetek) {
          
          uzenetek1.push({
            id: uzenetek[item].id,
            user: uzenetek[item].user,
            feladat: uzenetek[item].feladat,
            hatarido: uzenetek[item].hatarido,
            leiras: uzenetek[item].leiras,
            fontos: uzenetek[item].fontos
         });
       
       
        }
        this.setState({uzenetek: uzenetek1})
        }
        
        );
      
      }
        
        )
        
    }
  renderUzenetek = () => {
    return this.state.uzenetek.map(item => {
    return(
    <Row>
          <Col>
              <Card>
                <CardTitle>{item.name} <img src={item.avatar} width="30px" alt="avatar" /> {item.date}</CardTitle>
                <CardBody>
            
                  {item.message}
                  
                </CardBody>
              </Card>
          </Col>
        </Row>
    )})
    }
  

  render() {
    this.showUserdata();
    return (
      <div id="tartalom" name="tartalom">
        <Row>
          <Col className="text-center text-md-center">
            <h2>Csevegőprogram</h2>
          </Col>
        </Row>
        <Row>
          <Col className="iras col-12 d-flex justify-content-center">
            <FormGroup row>
              <Label for="exampleText" lg={1}>
                Üzenet
              </Label>
              <Col>
                <Input type="textarea" name="text" id="exampleText" value={this.state.message} onChange={this.handleChange} />
                <br />
              </Col>
              <Col>
                <Button
                
                color="primary"
                onClick={() => {
                  this.addMessage({
                    id: this.uuidv4(),
                    message: this.state.message,
                    name: firebase.auth().currentUser.displayName,
                    avatar: firebase.auth().currentUser.photoURL,
                    date: get(Date),
                  })
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
