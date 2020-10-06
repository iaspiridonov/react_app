import React, { Component } from "react";
import {
  Navbar,
  Container,
  Nav
} from "react-bootstrap";
import Logo from "./logo192.png";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import News from "../Pages/News";
import Profile from "../Pages/Profile";
import Login from "../Pages/Login";

export default class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sign: false,
      signText: ''
    };
  }

  handleSign = () => {
    if (this.state.sign == false){
      window.location.href = '/login';
    } else {
      localStorage.removeItem('id');
      window.location.reload();
    }
  };

  render() {
    this.state.sign = localStorage.getItem('id');
    
    if (this.state.sign != 0 && this.state.sign != null){
      this.state.sign = true;
      this.state.signText = 'выйти'
    } else {
      this.state.sign = false;
      this.state.signText = 'войти'
    }

    return (
      <>
        <Navbar
          collapseOnSelect
          expand="md"
          bg="dark"
          variant="dark"
        >
          <Container>
            <Navbar.Brand href="/news">
              <img
                src={Logo}
                height="30"
                width="30"
                className="d-inline-block align-top"
                alt="Logo"
              />
              React site
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/login">Логин</Nav.Link>
                <Nav.Link href="/news">Новости</Nav.Link>
                {this.state.sign &&
                  <Nav.Link href="/profile">Профиль</Nav.Link> 
                }
              </Nav>
              <button onClick={this.handleSign} className="nav__sign btn-light btn">{this.state.signText}</button>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Router>
          <Switch>
            <Route exact path="/news" component={News} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Router>
      </>
    );
  }
}
