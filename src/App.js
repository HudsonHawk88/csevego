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
    
  }

  componentDidMount() {
    this.authListener();
  }

  authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }
  render() {
    const user = this.state;
    console.log(user);
    console.log(this.state.user)
    return (
      
      <div>{this.state.user ? (<Home />) : (<Login />)}</div>
      
    );
  }
}

export default App;
