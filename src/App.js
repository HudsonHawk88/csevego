import React, { Component } from "react";
import {  } from "reactstrap";
import LandingPage from "./landingpage";
import Home from "./home";
import firebase from "./Firebase";
import "./App.css";


class App extends Component {

  render() {
    return (
      firebase.auth().currentUser ? <Home /> : <LandingPage />
    );
  }
}

export default App;
