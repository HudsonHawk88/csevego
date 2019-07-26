import React, { Component } from "react";
import { Nav, NavItem, Navbar, NavbarBrand, Collapse, NavbarToggler } from "reactstrap";
import Login from "./login";
import Home from "./home";
import Profile from './components/profile/profile';
import ChangeProfilData from './components/profile/changeprofildata';
import firebase from "./Firebase";
import "./App.css";
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';


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
 
  logout = () => {
    firebase.auth().signOut();
    return <Login />;
  };
  render() {

    return (
      <Router>
      <Navbar color="dark" expand="md">
          <NavbarBrand href="/">Csevegő</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="col-12 d-flex justify-content-center" navbar>
              <NavItem>
                <Link to="/">Főoldal</Link>
              </NavItem>
              &nbsp;&nbsp;&nbsp;
              <NavItem>
                <Link to="/components/download">Letöltések</Link>
              </NavItem>
              &nbsp;&nbsp;&nbsp;
              <NavItem>
                <Link to="/components/GDPR">GDPR</Link>
              </NavItem>
              &nbsp;&nbsp;&nbsp;
              {this.state.user ?
                <NavItem>
                <Link to="/components/profilom">Profilom</Link>
                </NavItem>               
                :
              <NavItem></NavItem>              
              }
              {this.state.user ?
                <NavItem>
                <Link to="/components/profilom_szerkesztese">Profilom szerkesztése</Link>
                </NavItem>               
                :
              <NavItem></NavItem>              
              }
              &nbsp;&nbsp;&nbsp;
              {this.state.user ?
                <NavItem>
                <Link to="/login/" onClick={this.logout}><img src={firebase.auth().currentUser.photoURL} alt="avatar" width="30px" />Kijelentkezés</Link>
                </NavItem>               
                :
              <NavItem></NavItem>              
              }
            </Nav>
          </Collapse>
        </Navbar>
        {this.state.user ? (<Route exact path="/" component={Home} />) : (<Route exact path="/" component={Login} />)}
        <Route path="/home/" component={Home} />
        <Route path="/components/profilom/" component={Profile} />
        <Route path="/components/profilom_szerkesztese/" component={ChangeProfilData} />
        <Route path="/login/" component={Login} />
        {this.state.user !== null ? (<Redirect to="/home/" />) : (<Redirect to="/login/" />)}
      </Router>
      
      
      
    );
    
  }
  
}

export default App;
