import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Identicon from "identicon.js";
import "./App.css";

class Navigation extends Component {
  render() {
    return (
      <Navbar expand="lg" bg="black" variant="dark">
        <Container>
          <Navbar.Brand href="#Main">SilverLine</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#faqs">FAQ</Nav.Link>
              <Nav.Link href="#About-us">About Us</Nav.Link>
              <NavDropdown title="Services" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  Private Sale
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Token Swap
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Public Sale
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
            </Nav>
            <Nav className="ml-auto">
              <ul className="navbar-nav px-3">
                <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                  <small className="font">
                    <small id="account">{this.props.account}</small>
                  </small>

                  {this.props.account ? (
                    <img
                      className="ml-2"
                      width="25"
                      height="25"
                      src={`data:image/png;base64,${new Identicon(
                        this.props.account,
                        30
                      ).toString()}`}
                      alt=""
                    />
                  ) : (
                    <span></span>
                  )}
                </li>
              </ul>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Navigation;
