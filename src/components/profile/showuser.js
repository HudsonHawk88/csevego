import React, { Component, Fragment } from "react";
import {
  Nav,
  NavItem,
  Navbar,
  NavbarBrand,
  Collapse,
  NavbarToggler
} from "reactstrap";
import Login from "../../login";
import Home from "../..//home";
import Profile from "./profile";
import ChangeProfilData from "./changeprofildata";
import firebase from "../../Firebase";
import "../../App.css";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Redirect
} from "react-router-dom";
import logo from '../../img/favicon.ico';

class ShowUser extends Component {
constructor() {
    super();
    this.state = {
        user: null,
        avatarURL: null,
        isOpen: false
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.authListener = this.authListener.bind(this);
    this.toggle = this.toggle.bind(this);
    }
logout = () => {
firebase.auth().signOut();
return <Login />;
};

toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

componentDidMount() {
this.authListener();
}
authListener() {
firebase.auth().onAuthStateChanged(user => {
    if (user) {
    this.setState({ user });
    } else {
    this.setState({ user: null });
    }
});
}
showData = () => {
    let currentUser = firebase.auth().currentUser;
    let username, photoUrl;

    if (currentUser != null) {
    username = currentUser.displayName;
    photoUrl = currentUser.photoURL;
    }
    return(
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
            {this.state.user ? (
            <NavItem>
                <Link to="/components/profilom">Profilom ({username ? (username) : ("")})</Link>
            </NavItem>
            ) : (
            <NavItem />
            )}&nbsp;&nbsp;&nbsp;
            {this.state.user ? (
            <NavItem>
                <Link to="/components/profilom_szerkesztese">
                Profilom szerkesztése
                </Link>
            </NavItem>
            ) : (
            <NavItem />
            )}
            &nbsp;&nbsp;&nbsp;
            {this.state.user ? (
            <NavItem>
                <Link to="/login/" onClick={this.logout}>
                <img
                    src={photoUrl ? (photoUrl) : (logo)}
                    alt="avatar"
                    width="30px"
                />
                Kijelentkezés
                </Link>
            </NavItem>
            ) : (
            <NavItem />
            )}
        </Nav>
        </Collapse>
    </Navbar>
    {this.state.user ? (
        <Route exact path="/" component={Home} />
    ) : (
        <Route exact path="/" component={Login} />
    )}
    <Route path="/home/" component={Home} />
    <Route path="/components/profilom/" component={Profile} />
    <Route
        path="/components/profilom_szerkesztese/"
        component={ChangeProfilData}
    />
    <Route path="/login/" component={Login} />
    {this.state.user !== null ? (
        <Redirect to="/home/" />
    ) : (
        <Redirect to="/login/" />
    )}
    </Router>
    
    )
}
render(){
return (
  <Fragment>{this.showData()}</Fragment>  
)
    
}
}

  export default ShowUser;