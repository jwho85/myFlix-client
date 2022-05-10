import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

export class HeaderView extends React.Component {
    render() {
        return (
            <Navbar expand="lg" sticky="top" className="nav-bar">
                <Container>
                    <Navbar.Brand href="#" className="logo-text">MYFLIX</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto"></Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}