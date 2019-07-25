import React, { Component } from "react";
import {  } from "reactstrap";
import Login from "./login";
import Home from "./home";
import firebase from "./Firebase";
import "./App.css";


class App extends Component {
  constructor() {
    super();
    this.state = ({
      user: null,
    });
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }
 
  render() {
    
    return (
      
      <div>{this.state.user ? (<Home />) : (<Login />)}</div>
      
    );
  }
}

export default App;
