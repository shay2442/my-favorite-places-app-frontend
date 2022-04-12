import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = ({ loggedIn, logoutUser, currentUser }) => {
  const loggedOutLinks = () => {
    return (
      <div className="body">
      <h1 className="sulogin">My Favorite Places</h1>
      <h3 className="h3"> A place for you to save all of your favorite places and remember what you liked about them. Enjoy!</h3>
      
      <br></br>
      <ul>
        
        <li>
          <Link className="link" to="/signup">Signup </Link>
        </li>
        <li>
          <Link className="link" to="/login">Login</Link>
        </li>
      </ul>
      </div>
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
