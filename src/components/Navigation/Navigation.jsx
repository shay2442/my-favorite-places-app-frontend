import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = ({ loggedIn, logoutUser, currentUser }) => {
  const loggedOutLinks = () => {
    return (
      <ul>
        <li>
          <Link to="/">Homepage</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    );
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser();
  };

  const loggedInLinks = () => {
    return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/home">
            {currentUser.username}'s Places
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/places">Places</Nav.Link>
            <Nav.Link href="/places/new">New Place</Nav.Link>
            <Nav.Link onClick={handleLogout} href="/">
              Logout
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
  };

  return <div>{loggedIn ? loggedInLinks() : loggedOutLinks()}</div>;
};

export default Navigation;
