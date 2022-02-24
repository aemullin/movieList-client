import React from 'react';
import {Navbar, Container, Nav, Button} from 'react-bootstrap';

export function Menubar({user}) {
    
    const onLogOut = () => {
        localStorage.clear();
        window.open("/", "_self");
    }
    
    const isAuth = () => {
        if(typeof window == "undefined") {
            return false;
        }
        if (localStorage.getItem("token")) {
            return localStorage.getItem("token");
        } else{
            return false;
        }
    };

    return (
        <Navbar className ="main-nav" sticky="top" bg="light">
            <Container fluid>
                <Navbar.Brand className="navbar-logo" href="/">Movie List</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        {isAuth() && (
                            <Nav.Link href={`/profile`}>{user}'s profile</Nav.Link>
                        )}
                        {isAuth() && (
                            <Button variant="secondary" onClick={() => { onLogOut() }}>Logout</Button>
                        )}
                        {!isAuth() && (
                            <Nav.Link href="/">Sign-in</Nav.Link>
                        )}
                        {!isAuth() && (
                            <Button variant="primary" href="/register">Sign-up</Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}