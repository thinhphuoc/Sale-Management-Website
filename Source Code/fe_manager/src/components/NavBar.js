import React from "react";
import {Navbar, Container, Nav} from "react-bootstrap";
import "../styles/NavBar.css";
import logo from "./assets/mrmanager.png";

function NavBar() {
    return (
        <Navbar expand="lg" className="navbar">
            <Container>
                <Nav.Link href="/">
                    <img src={logo} className="mrlogo" alt=""></img>
                </Nav.Link>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link
                            href="/"
                            className="navbarItem"
                            style={{color: "white"}}
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link
                            href="/store"
                            style={{color: "white"}}
                            className="navbarItem"
                        >
                            Store
                        </Nav.Link>
                        <Nav.Link
                            href="/transaction"
                            style={{color: "white"}}
                            className="navbarItem"
                        >
                            Transaction
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
