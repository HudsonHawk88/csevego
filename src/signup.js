import React, { Component } from "react";
import {
  Container,
  Form,
  Button,
  FormGroup,
  Label,
  Col,
  Input,
  FormText,
  Card,
  CardBody,
  CardTitle
} from "reactstrap";
import "./App.css";
import firebase from './Firebase';
import './Firebase';

class Signup extends Component {
   constructor(props){
     super(props)
     this.state = {
       email: '',
       password: ''
     };
   }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  signIn = e => {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).then((u)=>{console.log(u)})
    .catch((error) => {
        console.log(error);
      })
  }

    render() {
  
    return (
      <Container>
        <Card>
          <CardBody>
            <CardTitle>
              <h2>Regisztráció</h2>
            </CardTitle>
            <Form className="form">
              <Col>
                <FormGroup>
                  <Label>Felhasználónév</Label>
                  <Input
                    type="username"
                    name="username"
                    id="username"
                    placeholder=""
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>Avatar (profilkép)</Label>
                  <Input type="file" name="avatar" id="avatar" placeholder="" />
                  <FormText color="muted">
                    Válassza ki a kívánt profilképet... Maximum fileméret:
                    250kByte
                  </FormText>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>E-mail cím</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="myemail@email.com"
                    onChange={this.onChange}
                    value={this.state.email}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="password">Jelszó</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="********"
                    onChange={this.onChange}
                    value={this.state.password}
                  />
                </FormGroup>
              </Col>
              <Button type="submit" onClick={this.signIn()}>Regisztrálok</Button>
            </Form>
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default Signup;
