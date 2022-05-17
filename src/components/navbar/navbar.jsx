import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import "./navbar.scss";

export function Menubar({ user }) {

    const onLoggedOut = () => {
        localStorage.clear();
        window.open("/", "_self");
    }

    const isAuth = () => {
        if (typeof window == "undefined") {
            return false;
        }
        if (localStorage.getItem("token")) {
            return localStorage.getItem("token");
        } else {
            return false;
        }
    }

    return (
        <Navbar expand="lg" sticky="top" className="nav-bar">
            <Container>
                <Navbar.Brand href="/" className="logo-text">MYFLIX</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        {isAuth() && (
                            <Nav.Link href={'/users/${user}'}>{user}</Nav.Link>
                        )}
                        {isAuth() && (
                            <Button onClick={() => { onLoggedOut() }}>Logout</Button>
                        )}
                        {!isAuth() && (
                            <Nav.Link href="/">Sign-in</Nav.Link>
                        )}
                        {!isAuth() && (
                            <Nav.Link href="/register">Sign-up</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}